import { Link, Form as RemixForm } from "@remix-run/react";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import styles from "./Form.module.css";

export function Form({
  children,
  ...props
}: PropsWithChildren<ComponentPropsWithoutRef<typeof RemixForm>>) {
  return (
    <RemixForm className={styles.form} {...props}>
      {children}
    </RemixForm>
  );
}

export function Title({ children }: PropsWithChildren) {
  return <h1 className={styles.title}>{children}</h1>;
}

export function Label({ children }: PropsWithChildren) {
  return <label className={styles.label}>{children}</label>;
}

export function LabelSpan({ children }: PropsWithChildren) {
  return <span className={styles.labelSpan}>{children}</span>;
}

export function Input(props: ComponentPropsWithoutRef<"input">) {
  return <input className={styles.input} {...props} />;
}

export function OptionGroup({ children }: PropsWithChildren) {
  return <div className={styles.optionGroup}>{children}</div>;
}

export function Option(props: ComponentPropsWithoutRef<"input">) {
  return <input className={styles.option} {...props} />;
}

export function OptionName(props: ComponentPropsWithoutRef<"label">) {
  return <label className={styles.optionName} {...props} />;
}

export function OptionContent({ children }: PropsWithChildren) {
  return <div className={styles.optionContent}>{children}</div>;
}

export function Select(props: ComponentPropsWithoutRef<"select">) {
  return <select className={styles.select} {...props} />;
}

export function Buttons({ children }: PropsWithChildren) {
  return <div className={styles.buttons}>{children}</div>;
}

export function Submit(props: ComponentPropsWithoutRef<"button">) {
  return <button className={styles.submit} {...props} />;
}

export function SubmitLink(props: ComponentPropsWithoutRef<typeof Link>) {
  return <Link className={styles.submit} {...props} />;
}

export function Cancel(props: ComponentPropsWithoutRef<"button">) {
  return <button className={styles.cancel} {...props} />;
}

export function CancelLink(props: ComponentPropsWithoutRef<typeof Link>) {
  return <Link className={styles.cancel} {...props} />;
}
