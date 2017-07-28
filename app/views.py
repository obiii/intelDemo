from __future__ import division
from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context
from django.shortcuts import render_to_response
from django.template.loader import get_template
from django.template import RequestContext
from django.http import HttpResponseRedirect
# from django.core.context_processors import csrf
from django.views.decorators import csrf
from django.core import serializers
import os

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from xml.etree.ElementTree import XML, fromstring, tostring

import tweepy
import datetime
from django.conf import settings
from django.core.files.storage import FileSystemStorage

#import glob
from lxml import etree
import json
#import pandas as pd


# from django.core.context_processors import csrf
#import simplejson as json
#from twitter import Twitter, OAuth, TwitterHTTPError, TwitterStream
import requests
import ast

import sys
import re
import os
import subprocess
from os.path import isfile
#from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
#from pdfminer.pdfpage import PDFPage
#from pdfminer.converter import XMLConverter, HTMLConverter, TextConverter
#from pdfminer.layout import LAParams
#from cStringIO import StringIO


import urllib2

def indexDoc(filenames):
	 
	 filename = filenames
	 command = "/home/admins/Desktop/solr-6.6.0/bin/post -c Intelpol /home/admins/Desktop/intelpol/app/static/Docs/"+filename
	 output = os.system(command)
	 print output
	 return HttpResponse(output)


def Personal(filename):
	 
	 file = filename
	 command = "/home/admins/Desktop/solr-6.6.0/bin/post -c PInfo "+file
	 output = os.system(command)
	 print output
	 return HttpResponse(output)


def landing(request):
	return render(request, 'admin_1/landing.html')
def About(request):
	return render(request, 'admin_1/About.html')
def IEAP(request):
	return render(request, 'admin_1/IEAP.html')
def features(request):
	return render(request, 'admin_1/features.html')
def login(request):
	return render(request, 'admin_1/login.html')
def home(request):
	return render(request, 'admin_1/index.html')
def data_analysis(request):
	return render(request, 'admin_1/dataanalysis.html')
def data_upload(request):
	return render(request, 'admin_1/dataupload.html')


def uploadpage(request):
	return render(request, 'admin_1/upload.html')

def data_visualization(request):
	return render(request, 'admin_1/datavisualization.html')
def heatmaps(request):
	return render(request, 'admin_1/heatmaps.html')
def obj_recog_live(request):
	return render(request, 'admin_1/objectrecognition_livefeed.html')
def obj_recog_image(request):
	return render(request, 'admin_1/objectrecognition_imageanalysis.html')
def obj_recog_video(request):
	return render(request, 'admin_1/objectrecognition_videoanalysis.html')
def dashboard(request):
	return render(request, 'admin_1/dashboard.html')
def facerecognition_cctv(request):
	return render(request, 'admin_1/facerecognition_cctv.html')
def cctv(request):
	return render(request, 'admin_1/campages.html')
def sentimentanalysis_socialmedia(request):
	return render(request, 'admin_1/sentimentanalysis_socialmedia.html')
def intelligentsearchengine(request):
	return render(request, 'admin_1/intelligentsearchengine.html')

def simple_upload(request):
	if request.method == 'POST' and request.FILES['myfile']:
		files = request.FILES.getlist('myfile')

		for f in files:
			fs = FileSystemStorage()
			filename = fs.save(f.name, f)
			indexDoc(f.name)
		return HttpResponse("Successful")
	return render(request, 'admin1/upload.html')

def addPerson(request):
	if request.method=="POST":

		fname= request.POST['pfname'] 
		lname=request.POST['plname'] 
		gender = request.POST['pgender'] 
		cnic= request.POST['pcnic'] 
		dob = request.POST['pdob'] 
		nation=request.POST['pnation'] 

		address = request.POST['paddress'] 
		city = request.POST['pcity'] 
		code = request.POST['pcode']
		twitter = request.POST['ptwitter']

		image = request.FILES['imagefile']
		fs = FileSystemStorage()
		print fname+" "+lname+".jpg"
		filename = fs.save(fname+" "+lname+".jpg", image)

		filename= "app/static/Docs/Personal/"+fname+lname+".xml"

		file = open("app/static/Docs/Personal/"+fname+lname+".xml","w") 
		file.write("<add><doc>")
		file.write("<field name=\"FirstName\">"+fname+"</field>")
		file.write("<field name=\"LastName\">"+lname+"</field>")
		file.write("<field name=\"Gender\">"+gender+"</field>")
		file.write("<field name=\"CNIC\">"+cnic+"</field>")
		file.write("<field name=\"DOB\">"+dob+"</field>")
		file.write("<field name=\"Nationality\">"+nation+"</field>")
		file.write("<field name=\"Address\">"+address+"</field>")
		file.write("<field name=\"City\">"+city+"</field>")
		file.write("<field name=\"PostCode\">"+code+"</field>")
		file.write("<field name=\"Twitter\">"+twitter+"</field>")
		file.write("</doc></add>")
		file.close() 

		Personal(filename)		

    	return HttpResponse("Success")



def anpr_video(request):
	return render(request, 'admin_1/anpr_videodetection.html')
def anpr_live(request):
	return render(request, 'admin_1/anpr_livefeed.html')

def datasetupload(request):
	if request.method == 'POST':
		handle_uploaded_file(request.FILES['dataset'], str(request.FILES['dataset']))
		return HttpResponse("Successful "+str(request.FILES)+" upload.") 
	return HttpResponse("Failed")

def apidatasetupload(request):
	if request.method == 'POST':
		apilink=request.POST.get("apilink","none")
		datasetname=request.POST.get("datasetname","none")
		response = urllib2.urlopen(apilink)
		content=response.read()
		with open('upload/'+datasetname, 'w') as destination:
			destination.write(content)
		return HttpResponse("Success") 
	return HttpResponse("Failed")

def handle_uploaded_file(file, filename):
	print(file);
	print(filename)
	if not os.path.exists('upload/'):
		os.mkdir('upload/')
	print("directory created")
	with open('upload/'+filename, 'w+') as destination:
		for chunk in file.chunks():
			destination.write(chunk)

def get_datasets(request):
	if os.path.exists('upload/'):
		filenames=glob.glob("upload/*")
		response_data = {}
		response_data['result'] = True
		response_data['filenames'] = filenames
		return HttpResponse(json.dumps(response_data), content_type="application/json")
	else:
		response_data = {}
		response_data['result'] = False
		return HttpResponse(json.dumps(response_data), content_type="application/json")
def dataset_head(request):
	if request.method == 'POST':
		datasetname = request.POST.get('datasetname')
		if(datasetname!="None"):
			filepath="upload/"+datasetname
			if(".csv" in datasetname):
				df=pd.read_csv(filepath,index_col=0)				
				df=df.head()				
			elif(".xlsx" in datasetname):
				df=pd.read_excel(filepath)
				df=df.head()
			elif(".json" in datasetname):
				df=pd.read_json(filepath)
				df=df.head()
			elif(".JSON" in datasetname):
				df=pd.read_json(filepath)
				df=df.head()
			return HttpResponse(df.to_html())

# def index(request):
#     args = {}
#     args.update(csrf(request))
#     return render(request, 'index.html')

def get_tweets_of_mentions_by_time(api, stringText, startDate, endDate):
    
    queryText = stringText + ' since:' + str(startDate) + ' until:' +str(endDate)
    tweets = []
    for status in tweepy.Cursor(api.search,
                      q=queryText,
                      result_type='recent',
                      include_entities=True,
                      monitor_rate_limit=False,
                      wait_on_rate_limit=False).items(100):
        obj = {
               'user': {}
           }
        obj['text'] =  status.text
        obj['created_at'] =  str(status.created_at)
        obj['user']['name'] =  status.author._json['screen_name']
        obj['user']['location'] =  status.author._json['location']
        tweets.append(obj)
    return tweets

def get_tweets_of_user_by_time(api, username, startDate, endDate):
	print username
	startDate = datetime.datetime.strptime(startDate, "%Y-%m-%d")
	endDate = datetime.datetime.strptime(endDate, "%Y-%m-%d")
	print startDate
	tweets = []
	tmpTweets = api.user_timeline(username)
	for tweet in tmpTweets:
		if tweet.created_at < endDate and tweet.created_at > startDate:
			obj = {
				'user': {}
			}
			obj['text'] =  tweet.text
			obj['created_at'] =  str(tweet.created_at)
			obj['user']['name'] =  tweet.user.name
			obj['user']['location'] =  tweet.user.location
			tweets.append(obj)
			print tweets
	return tweets
    # return tweets


def fetchTweets(request):
   if request.method == 'POST':
        print request.POST
        ACCESS_TOKEN = '348925186-b1nJMEtUg7XIv3mEzsyyFy01JtCITFA26daMOwC7'
        ACCESS_SECRET = 'pHUJ9jUXWcLAEaDyhNhDh3rNK5HhDophRPKMUqOzicERL'
        CONSUMER_KEY = 't75MA4wvOrTPPfC55w74wtb0S'
        CONSUMER_SECRET = 'x2DaLrlQVIsju6oxDuJXC84GfKsDDBv6ZHEg6KjMR8IO6ofrRA'

        auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
        api = tweepy.API(auth)

        if request.POST['type'] == 'username':
            tweets = get_tweets_of_user_by_time(api, request.POST['query'], request.POST['dateFrom'], request.POST['dateTo'] )
        else:
            tweets = get_tweets_of_mentions_by_time(api, request.POST['query'], request.POST['dateFrom'], request.POST['dateTo'] )
        
        return HttpResponse(json.dumps(tweets), content_type="application/json")

def getSentiments(request):
    if request.method == 'POST':
        tweet = json.dumps(request.POST)
        tweet = ast.literal_eval(tweet)
        print tweet["query"]
        text = {  "text": tweet["query"],  "features": {"sentiment": {      "sentiment": True    },  "emotion": {      "emotion": True,      "sentiment": True    },    "entities": {      "emotion": True,      "sentiment": True    },    "keywords": {      "emotion": True,      "sentiment": True,    },  "concepts": {      "emotion": True,      "sentiment": True,    },  "categories": {      "emotion": True,      "sentiment": True,    }  }}

        user = "5872ca0b-fb54-40d6-a983-bc64ca7d8aec"
        password = "4MYBDt4YpUky"
        url = 'https://gateway.watsonplatform.net/natural-language-understanding/api'
        response = requests.post(
            url + "/v1/analyze?version=2017-02-27",
            auth=(user, password),
            headers={"content-type":"application/json"},
            data=json.dumps(text))
        # print response.text
        return HttpResponse(response, content_type="application/json")
    return HttpResponse("nahi hute bhai mujse")
def keywordsearch(request):
	if request.method == 'POST':
		directory_containing_docs = 'pdfs/'
		query = request.POST.get("keyword","none")
		query=str(query)
		print(query)
		files="";
		for file_in_dir in os.listdir(directory_containing_docs):			
			curr=str(directory_containing_docs)+str(file_in_dir)			
			if(".pdf" in file_in_dir):
				
				text = pdfparser(curr)
				text=str(text)
				print("Converted")
				if query in text:
					files=curr+","+files
			else:
				for line in open(curr, 'rb'):
					if re.search(query, line):
						files=curr+","+files									
		return HttpResponse(str(files)); 
	return HttpResponse("Failed")

def viewpdf(request):
	if request.method == 'GET':
		filename = request.GET.get("file","none")
		pdffile=open('pdfs/'+filename, 'rb')
		response = HttpResponse(content=pdffile)
		response['Content-Type'] = 'application/pdf'
		response['Content-Disposition'] = 'inline; filename="%s.pdf"' % filename
		return response
def pdfparser(data):
	fp = open(data,'rb')
	rsrcmgr = PDFResourceManager()
	retstr = StringIO()
	codec = 'utf-8'
	laparams = LAParams()
	device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
	# Create a PDF interpreter object.
	interpreter = PDFPageInterpreter(rsrcmgr, device)
	# Process each page contained in the document.
	for page in PDFPage.get_pages(fp):
		interpreter.process_page(page)
		data =  retstr.getvalue()
	fp.close()
	return data



