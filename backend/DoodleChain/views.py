from rest_framework import viewsets
from .models import User, Room, Task, Drawing
from .serializers import UserSerializer, RoomSerializer, TaskSerializer, DrawingSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=True, methods=['get'])
    def tasks(self, request, pk=None):
        room = self.get_object()
        tasks = room.tasks.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def results(self, request, pk=None):
        room = self.get_object()
        tasks = room.tasks.prefetch_related('drawings').all()
        results = []
        for task in tasks:
            for drawing in task.drawings.all():
                results.append({
                    'taskDescription': task.description,
                    'drawing': drawing.drawing,
                })
        return Response(results)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class DrawingViewSet(viewsets.ModelViewSet):
    queryset = Drawing.objects.all()
    serializer_class = DrawingSerializer

    def perform_create(self, serializer):
        serializer.save()
