import Button from "@material-ui/core/Button";

export default function LogIn({ width }) {
  return (
    <>
      {/* <Button href="/logout" variant="contained" color="primary">
          LogOut
        </Button> */}

      <Button href="/login" variant="contained" color="primary">
        LogIn
      </Button>
    </>
  );
}
