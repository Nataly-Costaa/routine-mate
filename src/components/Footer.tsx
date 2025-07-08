import React from "react";

export default function Footer() {
  return (
    <footer className="bg-amber-400 text-white text-center py-4 mt-8">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Routine Mate. Todos os direitos reservados.
      </p>
    </footer>
  );
}
