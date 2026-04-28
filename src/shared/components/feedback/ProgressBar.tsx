import { useNavigation } from "react-router";

export const ProgressBar = () => {
  const navigation = useNavigation();

  const loading = navigation.state === "loading";

  return loading ? (
    <div className="pointer-events-none fixed top-0 left-0 z-9999 h-1 w-full overflow-hidden">
      <div className="absolute h-full w-1/3 bg-cyan-600 animate-indeterminate" />
    </div>
  ) : null;
};
