from django.urls import path
# Importa os nomes corretos que existem em views.py
from .views import GroupCreateView, MyGroupsListView

urlpatterns = [
    # Esta rota usa a 'GroupCreateView'
    path('create/', GroupCreateView.as_view(), name='group-create'),
    
    # Esta rota usa a 'MyGroupsListView'
    path('mine/', MyGroupsListView.as_view(), name='my-groups-list'),
]