
from bottle import template, run, static_file, get

# Increase the version to force CSS reload
VERSION = 1

def page(name, **kwargs):
    return template(f'pages/{name}.py', version=VERSION, **kwargs)

def start(port=8080, debug=False):
    run(port=port, debug=debug)

# =============================================================
# Static Files
# =============================================================

@get('/style/<name:path>')
def style(name):
    return static_file(name, root='./style')

@get('/images/<name:path>')
def images(name):
    return static_file(name, root='./images')

# =============================================================
# HTML
# =============================================================

@get('/')
def index_page():
    return page('index')
