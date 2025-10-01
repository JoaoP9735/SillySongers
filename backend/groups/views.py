# backend/groups/views.py
from rest_framework import generics, permissions
from .models import Group
from .serializers import GroupSerializer

class GroupCreateView(generics.CreateAPIView):
    """
    View para criar um novo grupo (aceita POST).
    O usuário que cria o grupo é automaticamente adicionado a ele.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Salva o grupo primeiro
        group = serializer.save()
        # Adiciona o usuário logado (que criou o grupo) à relação ManyToMany
        group.usuarios.add(self.request.user)

class MyGroupsListView(generics.ListAPIView):
    """
    View para listar apenas os grupos do usuário autenticado (aceita GET).
    """
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filtra o queryset para retornar apenas os grupos
        # aos quais o usuário logado pertence.
        user = self.request.user
        return user.grupos.all()