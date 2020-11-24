from django.shortcuts import render
from django.views.generic.base import View


class ReactStart(View):
    def get(self, request):
        return render(request, 'frontend/gui/public/index.html')
