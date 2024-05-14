#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

#define RX_PIN D5
#define TX_PIN D6

SoftwareSerial gpsSerial(RX_PIN, TX_PIN);
TinyGPSPlus gps;
const char *ssid = "YOUR_WIFI_SSID";
const char *password = "YOUR_WIFI_PASSWORD";
const char *apiEndpoint = "YOUR_API_ENDPOINT";
const char *apiKey = "YOUR_API_KEY";
const int updateInterval = 60000; // Update every 60 seconds

void setup()
{
    Serial.begin(115200);
    gpsSerial.begin(9600);
    connectToWiFi();
}

void loop()
{
    if (millis() > updateInterval)
    {
        if (gps.location.isValid())
        {
            sendLocationData(gps.location.lat(), gps.location.lng());
        }
        millis() = 0;
    }
    while (gpsSerial.available() > 0)
    {
        if (gps.encode(gpsSerial.read()))
        {
            break;
        }
    }
}

void connectToWiFi()
{
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void sendLocationData(float latitude, float longitude)
{
    HTTPClient http;
    String url = String(apiEndpoint) + "?key=" + String(apiKey) +
                 "&lat=" + String(latitude, 6) + "&lng=" + String(longitude, 6);

    http.begin(url);

    int httpResponseCode = http.GET();
    if (httpResponseCode > 0)
    {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
    }
    else
    {
        Serial.print("HTTP Error code: ");
        Serial.println(httpResponseCode);
    }

    http.end();
}
