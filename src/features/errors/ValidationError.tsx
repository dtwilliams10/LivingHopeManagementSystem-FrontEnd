import { Message } from "semantic-ui-react";

interface Props {
  errors: any;
}

export default function ValidationError({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          <Message.Item>{errors.message}</Message.Item>
        </Message.List>
      )}
    </Message>
  );
}
