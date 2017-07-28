"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
import app
from app import views

urlpatterns = [
    url(r'^$', views.landing, name="landing"),
    url(r'^home', views.home, name="home"),
    url(r'^About', views.About, name="About"),
    url(r'^features', views.features, name="features"),
    url(r'^IEAP', views.IEAP, name="IEAP"),
    url(r'^login', views.login, name="login"),
    url(r'^data_analysis/', views.data_analysis, name="data_analysis"),
    url(r'^data_visualization/', views.data_visualization, name="data_visualization"),
    url(r'^heatmaps/', views.heatmaps, name="heatmaps"),
    url(r'^data_upload/', views.data_upload, name="data_upload"),
    url(r'^obj_recog_live/', views.obj_recog_live, name="obj_recog_live"),
    url(r'^obj_recog_image/', views.obj_recog_image, name="obj_recog_image"),
    url(r'^obj_recog_video/', views.obj_recog_video, name="obj_recog_video"),
    url(r'^anpr_video/', views.anpr_video, name="anpr_video"),
    url(r'^anpr_live/', views.anpr_live, name="anpr_live"),
    url(r'^datasetupload', views.datasetupload, name="datasetupload"),
    url(r'^apidatasetupload', views.apidatasetupload, name="apidatasetupload"),
    url(r'^get_datasets', views.get_datasets, name="get_datasets"),
    url(r'^dataset_head', views.dataset_head, name="dataset_head"),
    url(r'^dashboard', views.dashboard, name="dashboard"),
    url(r'^sentimentanalysis_socialmedia', views.sentimentanalysis_socialmedia, name="sentimentanalysis_socialmedia"),
    url(r'^getSentiments', views.getSentiments, name="getSentiments"),
    url(r'^fetchTweets', views.fetchTweets, name="fetchTweets"),
    url(r'^intelligentsearchengine', views.intelligentsearchengine, name="intelligentsearchengine"),
    url(r'^keywordsearch', views.keywordsearch, name="keywordsearch"),
    url(r'^pdf', views.viewpdf, name="viewpdf"),
    url(r'^facerecognition_cctv/', views.facerecognition_cctv, name="facerecognition_cctv"),
    url(r'^cctv/', views.cctv, name="cctv"),
    url(r'^indexDoc/', views.indexDoc, name="indexdoccctv"),
    url(r'^loadFiles/', views.simple_upload, name='loadFiles'),
    url(r'^upload/', views.uploadpage, name="uploadpage"),
    url(r'^addPerson/', views.addPerson, name="addPerson"),


]

