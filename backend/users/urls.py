from django.urls import path
from .views import UserCreateView, UserListView, UserDetailView, login_user, get_user_by_email

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='user-register'),
    path('login/', login_user, name='user-login'),
    path('', UserListView.as_view(), name='user-list'),
    path('<uuid:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('email/<str:email>/', get_user_by_email, name='user-by-email'),
]