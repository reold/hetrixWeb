export default function Preview() {
  return (
    <div class="flex flex-col w-full h-[60%] bg-gray-400 text-white text-center">
      <div class="flex flex-col justify-center items-center bg-gray-500 h-1/2 w-full">
        <div class="flex flex-col justify-center items-center bg-gray-700 h-[300px] w-[660px]">
          <p class="text-red-400">Nothing to show here!</p>
        </div>
      </div>
      <div>
        <p>Video controls are currently not available.</p>
      </div>
    </div>
  );
}
