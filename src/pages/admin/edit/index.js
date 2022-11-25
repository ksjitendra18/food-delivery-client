import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Edit = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
  return null;
};

export default Edit;
