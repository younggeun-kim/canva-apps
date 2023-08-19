import { Button, Rows, Text, MultilineInput } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import { auth } from "@canva/user";
import React, { useState } from "react";
import styles from "styles/components.css";

type State = "idle" | "loading" | "success" | "error";
//runpod APIs
const endpoint_id="jgaeb04ckzrfbv";
const run_endpoint=`https://api.runpod.ai/v2/${endpoint_id}/run`;
const health_endpoint=`https://api.runpod.ai/v2/${endpoint_id}/health`;

//runpod header
const api_key="SKDBTSH6C180KLURALZJG5O6U0BXIOIAWPW941HK";
const runpod_header={
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${api_key}`
};


export const App = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [state, setState] = useState<State>("idle");
  const [responseBody, setResponseBody] = useState<unknown | undefined>(
    undefined
  );
  const sendGetRequest = async () => {
    try {
      setState("loading");
      const payload={
        'input': {
            'text_list': Array.from({ length: 5 }).map(() => inputValue),
            'duration': 5,
            'document_id': "",
        }
    };
      const token = await auth.getCanvaUserToken();
      const res = await fetch(
        run_endpoint,
        {
            method: "POST",
            headers: runpod_header,
            body: JSON.stringify(payload),
        }
    );

      const body = await res.json();
      console.log(body);
      setResponseBody(body);
      setState("success");
    } catch (error) {
      setState("error");
      console.error(error);
    }
  };


  const onClick = () => {
    addNativeElement({
      type: "TEXT",
      children: [inputValue],
    });
  };

  function handleChange(value: string, event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(value);
    console.log(value);
}


  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          What sound would you create?
        </Text>
          
        <MultilineInput
    placeholder="bubble popping" 
    value={inputValue} 
    onChange={handleChange}
/>

        <Button variant="primary" onClick={sendGetRequest} stretch>
          Generate Sound Effects
        </Button>
        <Button variant="secondary" onClick={onClick} stretch>
          Sign up or Sign in
        </Button>
      </Rows>
</div>
  );
};
