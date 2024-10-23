import random
from sklearn.linear_model import LinearRegression
import numpy as np

# Función que ajusta el intervalo tn basado en las respuestas de la escala Likert usando IA
def calcular_intervalo_tn_con_ia(estado_inicial, atencion_mindfulness, tiempo_inicial_tarea, valores_likert):
    # Datos de entrenamiento: escalas Likert anteriores y sus correspondientes tiempos de estudio (en minutos)
    X = np.array([[1], [2], [3], [4], [5], [6], [7]])  # Valores posibles de la escala Likert
    y = np.array([20, 30, 40, 45, 50, 55, 60])  # Tiempos de estudio asociados a cada valor Likert (ficticios)

    # Crear el modelo de regresión lineal
    modelo = LinearRegression()
    modelo.fit(X, y)  # Entrenar el modelo con los datos

    # Simulación de respuestas con valores dados en la lista valores_likert
    for Mn in valores_likert:
        # Predecir el tiempo de estudio para el nuevo valor de la escala Likert
        tn_predicho = modelo.predict([[Mn]])[0]

        # Aplicar un pequeño ajuste aleatorio al tiempo para mayor variabilidad
        ajuste_aleatorio = random.uniform(-5, 5)
        tn_ajustado = tn_predicho + ajuste_aleatorio

        print(f"Respuesta de la escala Likert: {Mn} -> Tiempo de estudio tn asignado por IA: {tn_ajustado:.2f} minutos\n")

# Parámetros iniciales
estado_inicial = 7  # Nivel inicial de atención del estudiante (1-7)
atencion_mindfulness = 6  # Atención después de la práctica de mindfulness (1-7)
tiempo_inicial_tarea = 45  # Tiempo inicial de concentración en minutos

# Simulación de respuestas de la escala Likert (1-7)
valores_likert = [4, 6, 3, 5, 7]  # Ejemplo de valores dados en varias sesiones

# Llamada a la función para simular la asignación de tn usando IA
calcular_intervalo_tn_con_ia(estado_inicial, atencion_mindfulness, tiempo_inicial_tarea, valores_likert)