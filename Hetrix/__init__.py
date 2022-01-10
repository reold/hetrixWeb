from .settings import *


class Object:
    def __init__(self, type: str, start: float, duration: float, fps: int, identifier, arg_list: list):
        self.type = type
        self.start = start * fps
        self.duration = duration * fps
        self.identifier = identifier
        self.arg_list = arg_list

    def get_frame(self,):
        if self.type == "video":
            return np.array(self.identifier(*self.arg_list))


@dataclass
class Track:
    objects: List[Object]


@dataclass
class Timeline:
    duration: int

    tracks: List[Track]


class Hetrix:
    def __init__(self):
        pass

    def load_file(self, file_path):
        pass

    def new_canvas(self, resolution, duration, fps, bg_color=(0, 0, 0), tracks=2):

        self.resolution = resolution
        self.duration = duration
        self.fps = fps

        # >> timeline config
        self.timeline = Timeline(
            self.duration, [Track([]) for _ in range(tracks)])

        # >> backplate config
        self.bg_color = bg_color[::-1]
        self.backplate = np.array(
            Image.new("RGB", self.resolution, self.bg_color))

    def update_backplate(self):
        self.backplate = Image.new(
            "RGB", self.resolution, self.bg_color)

    def add_object(self, track_no, *args):
        self.timeline.tracks[track_no].objects.append(Object(*args))

    def _composite(self, t):

        final_img = self.backplate

        for i, track in enumerate(self.timeline.tracks):
            objects = track.objects
            objects.sort(key=lambda obj: obj.start)

            def paper(obj):
                if obj.start <= t*self.fps and (obj.start + obj.duration) >= t*self.fps:
                    return True

            current_objects = list(filter(paper, objects))

            if len(current_objects) != 0:
                current_object = current_objects[0]
                final_img = current_object.get_frame()

        return final_img

    def _render_ui(self):
        try:
            os.system("cls")
        except:
            os.system("clear")

        os.system("")

        print("Hetrix Rendering")
        print("rendering using imageio")

    def render(self, name, type):

        clip = mpy.VideoClip(self._composite, duration=self.duration)

        if type == "gif":
            self._render_ui()
            clip.write_gif(f"{name}.gif", fps=self.fps)
