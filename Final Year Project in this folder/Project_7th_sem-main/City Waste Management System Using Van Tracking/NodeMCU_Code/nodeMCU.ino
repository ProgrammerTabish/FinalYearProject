#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <TinyGPS++.h>

const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

const char* firebaseHost = "your_firebase_database_url";
const char* firebaseAuth = "your_firebase_database_secret";

FirebaseData firebaseData;
TinyGPSPlus gps;

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);  // GPS module
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");

  Firebase.begin(firebaseHost, firebaseAuth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  while (Serial1.available() > 0) {
    gps.encode(Serial1.read());
    if (gps.location.isUpdated()) {
      String lat = String(gps.location.lat(), 6);
      String lng = String(gps.location.lng(), 6);

      if (Firebase.setString(firebaseData, "/gps/lat", lat) && 
          Firebase.setString(firebaseData, "/gps/lng", lng)) {
        Serial.println("Data sent to Firebase");
      } else {
        Serial.println("Firebase setString failed");
        Serial.println(firebaseData.errorReason());
      }
    }
  }
}
