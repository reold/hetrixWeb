# imports
import eel
import sys
import os

# main
script_dir = os.path.dirname(__file__)


@eel.expose
def get_image(options):  # frame=1, size=(150, 150)):
    print("Image requested")


@eel.expose
def create_layer(options):

    content = None

    if options.type == "text":
        content = putText()


# run
if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--develop":
        eel.init("client")
        eel.start(
            {"port": 3000},
            options={"port": 8888, "host": "localhost"},
            suppress_error=True,
            # size=screen_size(),
        )
    else:
        eel.init("build")
        eel.start("index.html")

# end
