export function MenuItem({ href, label }) {
  return (
    <li>
      <a href={href} title={label}>
        <img src="/images/link.png" width="20" alt="" />
        {label}
      </a>
    </li>
  );
}
