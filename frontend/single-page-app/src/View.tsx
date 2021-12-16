import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { Pane, majorScale, Spinner } from "evergreen-ui";

export default function View() {
  let { id } = useParams();
  const [content, setContent] = React.useState<any>();
  React.useEffect(() => {
    fetch(
      `http://k8s-default-servicea-10661b8be6-224305748.us-east-1.elb.amazonaws.com/get/${id}`
    )
      .then((response) => response.json())
      .then((data) => setContent(data));
  }, []);
  return (
    <>
      {content ? (
        <Pane
          alignItems="center"
          marginX={majorScale(12)}
          justifyContent="center"
          style={{ textAlign: "center" }}
        >
          <MDEditor.Markdown source={content.content} />
        </Pane>
      ) : (
        <Pane
          display="flex"
          alignItems="center"
          marginX={majorScale(12)}
          justifyContent="center"
          height={400}
          style={{ textAlign: "center" }}
        >
          <Spinner size={128}/>
        </Pane>
      )}
    </>
  );
}
