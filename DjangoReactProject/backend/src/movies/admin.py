from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

from .models import Movie, Genre, Category


class MyModelAdmin(admin.ModelAdmin, DynamicArrayMixin):
    admin.site.register(Movie)


admin.site.register(Genre)
admin.site.register(Category)




