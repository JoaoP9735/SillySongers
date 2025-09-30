from django.db import models
from users.models import CustomUser
import uuid

class Group(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nome = models.CharField(max_length=100, unique=True)
    points = models.IntegerField(default=0)
    current_goal = models.CharField(max_length=255, blank=True)
    usuarios = models.ManyToManyField(CustomUser, related_name='grupos')

    @property
    def quantidade_usuarios(self):
        """Retorna a quantidade de usuários no grupo."""
        return self.usuarios.count()

    def __str__(self):
        return self.nome