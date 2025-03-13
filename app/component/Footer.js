export default function Footer() {
  return (
    <div>
      <footer className="mt-16 bg-gray-800 text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Fortune, IyaInTech. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
