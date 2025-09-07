const studioUrl =
  process.env.NEXT_PUBLIC_DRIZZLE_STUDIO_URL || "http://local.drizzle.studio";

const DrizzleStudio = () => {
  return <iframe src={studioUrl} className="w-full h-full" />;
};

export default DrizzleStudio;
