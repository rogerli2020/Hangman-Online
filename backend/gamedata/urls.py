from django.urls import path
from . import views

urlpatterns = [
    path('get_top_players/', views.get_top_players, name='get-top-players'),
    path('get_top_words/', views.get_top_words, name='get-top-words'),
    path('get_my_game_stats/<int:pid>/', views.get_my_game_stats, name='get-my-game-stats')
]