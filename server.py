
import bottle

# Increase the version to force CSS reload
VERSION = 0

def page(name, **kwargs):
    return bottle.template(f'pages/{name}.py', version=VERSION, **kwargs)

def start(port=8080, debug=False):
    bottle.run(port=port, debug=debug)

# =============================================================
# Static Files
# =============================================================

@bottle.get('/style/<name:path>')
def style(name):
    return bottle.static_file(name, root='./style')

@bottle.get('/images/<name:path>')
def images(name):
    return bottle.static_file(name, root='./images')

# =============================================================
# HTML
# =============================================================

@bottle.get('/')
def index():
    return page('index')
