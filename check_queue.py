import boto3
import os
import time
import webbrowser
# from selenium import webdriver

from selenium import webdriver
import time

from selenium.webdriver.support.ui import WebDriverWait
import unittest
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By





def login_intelpol(id, username, password):
    print "xxx"


    driver.get("http://localhost:8000")

    emailFieldID = "username"
    passFieldID = "password"


    emailFieldElement = driver.find_element_by_id(emailFieldID).send_keys(username)
    passFieldElement = driver.find_element_by_id(passFieldID).send_keys(password)
    time.sleep(2)

    login = driver.find_element_by_id(id)
    print "login"

    login.click()
    print "done"

    time.sleep(5)




def pop_message(client, url):
    response = client.receive_message(QueueUrl = url, MaxNumberOfMessages = 10)

    #last message posted becomes messages
    message = response['Messages'][0]['Body']
    receipt = response['Messages'][0]['ReceiptHandle']
    client.delete_message(QueueUrl = url, ReceiptHandle = receipt)
    return message


access_key = "AKIAJCQPZECSBOWASMVQ"
access_secret = "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"
region ="us-east-1"
queue_url = "https://sqs.us-east-1.amazonaws.com/222824373002/hacktwodih"

options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
options.add_argument("disable-infobars")

driver = webdriver.Chrome('/usr/local/bin/chromedriver', chrome_options=options)
# login_intelpol("maatha1", "admin", "admin")

for i in range(0,10000):
    client = boto3.client('sqs', aws_access_key_id = access_key, aws_secret_access_key = access_secret, region_name = region)
    # print i
    try:
        message = pop_message(client, queue_url)
        print "***"
        print(message)
        print "***"
        

        if message == "on":
            print "ON"
            # login_intelpol("xyzlogin", "admin", "admin")
            driver.get("http://localhost:8000")
            emailFieldID = "username"
            passFieldID = "password"
            emailFieldElement = driver.find_element_by_id(emailFieldID).send_keys("admin")
            passFieldElement = driver.find_element_by_id(passFieldID).send_keys("admin")
            time.sleep(2)
            login = driver.find_element_by_id("xyzlogin")
            login.click()
            time.sleep(5)

        elif message == "off":

            print "off"
            
            
        elif message == "one":
            # id="dataanalysis_title"

            dataanalysis_title = driver.find_element_by_id("dataanalysis_title1")
            print dataanalysis_title
            dataanalysis_title.click()
            time.sleep(2)
            dataanalysis_link = driver.find_element_by_id("dataanalysis_item")
            dataanalysis_link.click()
            time.sleep(2)



        elif message == "two":
            # # id="dataupload_item"

            dataupload_link = driver.find_element_by_id("dataupload_item")
            dataupload_link.click()
            time.sleep(2)
            

        elif message == "four":
            # # datavisualization_item

            datavisualization_link = driver.find_element_by_id("datavisualization_item")
            datavisualization_link.click()
            time.sleep(10)


        elif message == "five":
            # # heatmaps_item
            heatmaps_link = driver.find_element_by_id("heatmaps_item")
            heatmaps_link.click()
            time.sleep(2)

        elif message == "six":
            # # facerecognition_title
            facerecognition_title = driver.find_element_by_id("facerecognition_title")
            facerecognition_title.click()
            time.sleep(2)
            cctv_title = driver.find_element_by_id("facerecognition_cctv_item1")
            cctv_title.click()
            time.sleep(7)

        elif message == "seven":
            cctv_title = driver.find_element_by_id("facerecognition_cctv_item2")
            cctv_title.click()
            time.sleep(7)


        elif message == "eight":
            # # objectrecognition_title
            objectrecognition_title = driver.find_element_by_id("objectrecognition_title")
            objectrecognition_title.click()
            time.sleep(2)
            livefeed_link = driver.find_element_by_id("objectrecognition_livefeed_item")
            livefeed_link.click()
            time.sleep(7)


        elif message == "twelve":            
            # # anpr_title
            anpr_title = driver.find_element_by_id("anpr_title")
            anpr_title.click()
            time.sleep(2)
            anpr_livefeed_link = driver.find_element_by_id("anpr_livefeed_item")
            anpr_livefeed_link.click()
            time.sleep(7)



        elif message == "fifteen":
            # # intelligent_search_title
            intelligent_search_link = driver.find_element_by_id("intelligent_search_title")
            intelligent_search_link.click()
            time.sleep(2)

            elm = driver.find_element_by_tag_name('html')
            elm.send_keys(Keys.HOME)
            time.sleep(7)



        elif message == "sixteen":
            # # sentimentanalysis_title
            sentimentanalysis_link = driver.find_element_by_id("sentimentanalysis_title")
            sentimentanalysis_link.click()
            time.sleep(2)

            elm.send_keys(Keys.HOME)
            time.sleep(2)

            sentim_social = driver.find_element_by_id("sentimentanalysis_socialmedia_item")
            sentim_social.click()
            time.sleep(2)

    except:
        pass
    time.sleep(1)

#************************************************************************





















