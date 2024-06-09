/*
Projeto de Tecnologias de Interface (TI)
Milestone 3 — Proof of Concept
Trabalho realizado por: Ana Rodrigues (2023186276) e Francisco Rodrigues (2020247914)

Mobilidade e Orientação para Pessoas com Deficiência Visual
*/

// VL53L0X
#include "Adafruit_VL53L0X.h"
Adafruit_VL53L0X lox = Adafruit_VL53L0X();

int distanceTOF;
bool objectDetectedTOF = false;

bool calibrated = false;
int calibratedHeight = 0;
const int thresholdDistance = 100;

const int numReadings = 10;  // número de leituras
int readingsTOF[numReadings];

// Motores de Vibração
#define motorNum 2                                // Número de motores de vibração
const int vibrationMotor[motorNum] = { 12, 14 };  // Pins motores de vibração

// HC-SR04's
#define sensorNum 2                          // Número de sensores HC-SR04
const int trigPins[sensorNum] = { 16, 18 };  // Pins Trigger
const int echoPins[sensorNum] = { 17, 19 };  // Pins Echo

int maximumRange = 120;  // Distância máxima
int minimumRange = 20;   // Distância mínima
int duration, distance;  // Cálculo da distância

bool objectDetectedU1 = false;  // Se obstáculo detetado em HC-SR04 nº1
bool objectDetectedU2 = false;  // Se obstáculo detetado em HC-SR04 nº2

bool feedback = false;               // O motor está em funcionamento
const int feedbackTime = 500;        // Tempo de vibração
const int feedbackTimeTOF = 1000;    // Tempo de vibração
unsigned long lastFeedbackTime = 0;  // Temporizador para que possa ocorrer nova vibração

void setup() {
  Serial.begin(115200);

  // Esperar serial
  while (!Serial) {
    delay(1);
  }

  // TOF
  if (!lox.begin()) {
    while (1)
      ;
  }
  lox.startRangeContinuous();

  // Motores de Vibração
  for (int i = 0; i < motorNum; i++) {
    pinMode(vibrationMotor[i], OUTPUT);
  }
  // HC-SR04's
  for (int i = 0; i < sensorNum; i++) {
    pinMode(trigPins[i], OUTPUT);
    pinMode(echoPins[i], INPUT);
  }

  calibratedHeight = calibrationHeight();
  Serial.println(calibratedHeight);
}

void loop() {
  if (calibrated) {  // Se o TOF estiver calibrado
    // Verificar se o sensor encontrou algum obstáculo
    objectDetectedU1 = objectDetection(trigPins[0], echoPins[0]);  //  Sensor nº1
    objectDetectedU2 = objectDetection(trigPins[1], echoPins[1]);  //  Sensor nº2
    objectDetectedTOF = objectDetectionTOF();                      // Sensor TOF

    // Debug
    Serial.print(objectDetectedU1);
    Serial.print(" : ");
    Serial.print(objectDetectedTOF);
    Serial.print(" : ");
    Serial.println(objectDetectedU2);

    // Temporizador de tempo de vibração
    // Só pode ocurrer nova vibração após este temporizador
    // Se detetar obstáculo nos dois
    if (objectDetectedU1 && objectDetectedU2 && millis() - lastFeedbackTime > feedbackTime) {
      hapticFeedback(2, 1, feedbackTime);
      lastFeedbackTime = millis();
    }
    // Se detetar obstáculo no sensor nº1
    if (objectDetectedU1 && millis() - lastFeedbackTime > feedbackTime) {
      hapticFeedback(1, 0, feedbackTime);
      lastFeedbackTime = millis();
    }
    // Se detetar obstáculo no sensor nº2
    if (objectDetectedU2 && millis() - lastFeedbackTime > feedbackTime) {
      hapticFeedback(1, 1, feedbackTime);
      lastFeedbackTime = millis();
    }
    // Se detetar obstáculo no TOF
    if (objectDetectedTOF && millis() - lastFeedbackTime > feedbackTimeTOF) {
      hapticFeedback(2, 1, feedbackTimeTOF);
      hapticFeedback(2, 1, feedbackTime);
      lastFeedbackTime = millis();
    }

    delay(100);
  }
}

// Feedback háptico para deteção de obstáculos e
void hapticFeedback(int numMotorsVibrating, int motorIndex, unsigned long feedbackDuration) {
  unsigned long feedbackStartTime = millis();  // Inicializar o temporizador de tempo de vibração

  while (millis() - feedbackStartTime < feedbackDuration) {
    if (numMotorsVibrating == 1) {                     // Para um motor
      digitalWrite(vibrationMotor[motorIndex], HIGH);  // Ativar vibração para esse motor
    } else {
      for (int i = 0; i < motorNum; i++) {      // Para vários motores
        digitalWrite(vibrationMotor[i], HIGH);  // Ativar vibração para todos os motores
      }
    }
    feedback = true;
  }

  for (int i = 0; i < motorNum; i++) {
    digitalWrite(vibrationMotor[i], LOW);  // Desativar vibração para todos os motores
  }
  feedback = false;
}

// Cálculo da distância a que se encontra um obstáculo
float calcDistance(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH, 50000);
  distance = (duration * .0343) / 2;
  return distance;
}

// Verificar para cada sensor se o obstáculo encontrado se encontra ou não nos limites impostos
bool objectDetection(int trigPin, int echoPin) {
  bool objectDetected = false;

  if (!feedback) {                                                                                           // Se não estiver a ocorrer nenhuma vibração no momento
    if (calcDistance(trigPin, echoPin) <= maximumRange && calcDistance(trigPin, echoPin) >= minimumRange) {  // Verificar limites
      objectDetected = true;
    }
  }
  return objectDetected;
}


// TOF
// Cálculo da distância a que se encontra um obstáculo
float calcDistanceTOF() {
  VL53L0X_RangingMeasurementData_t measure;
  lox.rangingTest(&measure, false);
  if (measure.RangeStatus != 4) {           // phase failures
    distanceTOF = measure.RangeMilliMeter;  // cálculo da distância
  }
  return distanceTOF;
}

// Calibração da altura da cintura da pessoa
float calibrationHeight() {
  calibratedHeight = 0;  // reset da calibração

  for (int i = 0; i < numReadings; i++) {
    readingsTOF[i] = calcDistanceTOF();
    calibratedHeight += readingsTOF[i];  // somar todas as leituras do sensor
    delay(100);

    Serial.print("Calibração - ");
    Serial.println(i);
  }
  calibratedHeight = calibratedHeight / numReadings;  // média dos valores

  if (calibratedHeight != 0) {
    calibrated = true;  // distância calibrada
  }
  return calibratedHeight;
}

bool objectDetectionTOF() {
  bool objectDetected = false;

  if (abs(calcDistanceTOF() - calibratedHeight) > thresholdDistance) {
    objectDetected = true;
  }

  return objectDetected;
}
