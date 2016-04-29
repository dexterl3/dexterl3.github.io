from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import pickle

#for loop

profile = webdriver.FirefoxProfile()
profile.native_events_enabled = True
driver = webdriver.Firefox(profile)


driver.add_cookie({'name' : 'JSESSIONID', 'value' : '64008117CEF48CF7BC699F30C5B2051F'})
 
driver.add_cookie({'name' : 'default_realm', 'value' :'molywvqa-z1lhs8ki8tfc24'})

driver.get("http://5.232.88.20:9280/AppInform/home?cmd=Job&key=411")

 
f = open('testfile.txt','w')
f.write('hi test')
f.close()
assert "No results found." not in driver.page_source

#driver.close()

#login id is field_userid
#assert "Python" in driver.title
# field_agent_obj_messages_0_message_text_0_text and field_agent_obj_messages_0_message_text_1_text

#<input name=".passwd.password"  
#i id = login-passwd-webcontrol"
