import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("Input Fields Working", () => {
  const { getByLabelText } = render(<ContactForm />);

  const fNameInput = getByLabelText(/first name/i);
  const lNameInput = getByLabelText(/last name/i);
  const emailInput = getByLabelText(/email/i);
  const messageInput = getByLabelText(/message/i);
});

test("Input fields fail validation (Intentinally throws a fail.)", async () => {
  const { getByLabelText, findByText } = render(<ContactForm />);

  const fNameInput = getByLabelText(/first name/i);
  const lNameInput = getByLabelText(/last name/i);
  const emailInput = getByLabelText(/email/i);
  const messageInput = getByLabelText(/message/i);

  fireEvent.change(fNameInput, {
    target: { name: "firstName", value: "T" }
  });
  fireEvent.change(lNameInput, {
    target: { name: "lastName", value: "C" }
  });
  fireEvent.change(emailInput, {
    target: { name: "email", value: "Tunagmail.com" }
  });
  fireEvent.change(messageInput, {
    target: { name: "messsage", value: "I am owner not you." }
  });

  await findByText(/error/i);
});

test("Input fields pass validation (Throws a Passing)", () => {
  const { getByLabelText, getByText, getByRole } = render(<ContactForm />);

  const fNameInput = getByLabelText(/first name/i);
  const lNameInput = getByLabelText(/last name/i);
  const emailInput = getByLabelText(/email/i);
  const messageInput = getByLabelText(/message/i);

  fireEvent.change(fNameInput, {
    target: { name: "firstName", value: "Tuna" }
  });
  fireEvent.change(lNameInput, {
    target: { name: "lastName", value: "Cat" }
  });
  fireEvent.change(emailInput, {
    target: { name: "email", value: "Tuna@gmail.com" }
  });
  fireEvent.change(messageInput, {
    target: { name: "messsage", value: "I am owner not you." }
  });

  const submitButton = getByRole("submit");
  fireEvent().click(submitButton);
});
