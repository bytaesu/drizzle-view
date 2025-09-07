const visualizerUrl =
  process.env.NEXT_PUBLIC_DRIZZLE_VISUALIZER_URL || "http://localhost:64738";

const DrizzleVisualizer = () => {
  return <iframe src={visualizerUrl} className="w-full h-full" />;
};

export default DrizzleVisualizer;
