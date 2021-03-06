#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
Script to start localhost server using cherrypy. Meant for local use only, since the user 'local'
is automatically logged in and authentication is skipped. For server installations a web server
such as Apache should be used.
Author: Amir Zeldes
"""

import cherrypy
import os
from open import open_main
from structure import structure_main
from segment import segment_main
from admin import admin_main

class Root(object):
	@cherrypy.expose
	def default(self,**kwargs):
		print kwargs
		return '<script>document.location.href="open";</script>'

	@cherrypy.expose
	def open(self,**kwargs):
		print kwargs
		return open_main("local","3","local",**kwargs)

	@cherrypy.expose
	def structure(self,**kwargs):
		print kwargs
		if "current_doc" not in kwargs:
			return '<script>document.location.href="open";</script>'
		else:
			return structure_main("local","3",'local',**kwargs)

	@cherrypy.expose
	def segment(self,**kwargs):
		print kwargs
		if "current_doc" not in kwargs:
			return '<script>document.location.href="open";</script>'
		else:
			return segment_main("local","3",'local',**kwargs)

	@cherrypy.expose
	def admin(self,**kwargs):
		print kwargs
		return admin_main("local","3",'local',**kwargs)


current_dir = os.path.dirname(os.path.realpath(__file__)) + os.sep
conf = {
		'/css': {'tools.staticdir.on': True,'tools.staticdir.dir': os.path.join(current_dir,'css')},
		'/img': {'tools.staticdir.on': True,'tools.staticdir.dir': os.path.join(current_dir,'img')},
		'/script': {'tools.staticdir.on': True,'tools.staticdir.dir': os.path.join(current_dir,'script')}
        }

cherrypy.quickstart(Root(), '/', conf)