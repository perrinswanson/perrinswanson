
def svg_string(name):
    '''Returns the SVG string for the given file name'''
    try:
        with open(f'./images/{name}.svg', 'r') as file:
            return file.read().replace('"', "\'")
    except:
        return ''
