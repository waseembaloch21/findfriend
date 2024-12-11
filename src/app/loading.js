export default function loading() {
    return (
      <div className="flex min-h-screen justify-center items-center flex-row gap-2">
        <div className="w-6 h-6 rounded-full bg-green-600 animate-bounce [animation-delay:.7s]" />
        <div className="w-6 h-6 rounded-full bg-red-600 animate-bounce [animation-delay:.3s]" />
        <div className="w-6 h-6 rounded-full bg-blue-600 animate-bounce [animation-delay:.7s]" />
      </div>
    );
  }