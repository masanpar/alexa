#include <LiquidCrystal.h>
#include "DHT.h"
#define DHTPIN 13 
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);
// const int inputPin = A0;  
// uint16_t inputValue = 0;   

float cel,hum;

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2); 
  dht.begin();        
}

void loop () {
    printHT();
    delay(60000);
}

void printHT() {
  hum = dht.readHumidity();
  cel = dht.readTemperature();
  
  lcd.setCursor(0, 0);
  lcd.print(" ");
  lcd.print((int) cel);
  Serial.print((int) cel);
  lcd.print("C ");
  lcd.print(" ");
  lcd.print((int) hum);
  Serial.print("-");
  Serial.print((int) hum);
  lcd.print("%");
  Serial.println("");
}

// int botones() 
//  {
//  inputValue = analogRead(inputPin);
//  if(inputValue < 100 && inputValue >= 0) inputValue = 1;
//  else if(inputValue < 250 && inputValue > 150) inputValue = 2;
//  else if(inputValue < 470 && inputValue > 370) inputValue = 3;
//  else if(inputValue < 670 && inputValue > 570) inputValue = 4;
//  else if(inputValue < 870 && inputValue > 770) inputValue = 5;
//  else if(inputValue <= 1023 && inputValue > 950) inputValue = 0;
// }

