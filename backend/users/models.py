# users/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import uuid
from rest_framework.authtoken.models import Token
class CustomUserManager(BaseUserManager):
    """
    Manager customizado onde o email é o identificador único para
    autenticação em vez do username.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Cria e salva um usuário com o email e a senha fornecidos.
        """
        if not email:
            raise ValueError('O Email deve ser definido')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Cria e salva um Superusuário com o email e a senha fornecidos.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)


## 2. Atualize seu CustomUser para usar o novo Manager ##
class CustomUser(AbstractUser):
    username = None
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(('endereço de email'), unique=True)
    nome = models.CharField(max_length=150)
    apelido = models.CharField(max_length=50, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']

    objects = CustomUserManager() # Diz ao Django para usar nosso manager customizado

    def __str__(self):
        return self.email
    
    