# backend/groups/serializers.py
from rest_framework import serializers
from .models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'nome', 'points', 'current_goal', 'quantidade_usuarios']
        read_only_fields = ['points', 'quantidade_usuarios'] # Esses campos não devem ser enviados na criação