from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)

class Room(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, default=1)  # Укажите значение по умолчанию
    code = models.CharField(max_length=10, unique=True)

class Task(models.Model):
    room = models.ForeignKey(Room, related_name='tasks', on_delete=models.CASCADE)
    description = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

class Drawing(models.Model):
    task = models.ForeignKey(Task, related_name='drawings', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='drawings/')
    created_at = models.DateTimeField(auto_now_add=True)
