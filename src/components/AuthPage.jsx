import React, { useMemo, useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const isLogin = mode === "login";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const onChange = (e) => {
    setMsg({ type: "", text: "" });
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const errors = useMemo(() => {
    const e = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const phoneOk = form.phone.trim() === "" ? true : /^[0-9]{10}$/.test(form.phone.trim());

    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailOk) e.email = "Enter a valid email";

    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";

    if (!isLogin) {
      if (!form.fullName.trim()) e.fullName = "Full name is required";
      if (!form.phone.trim()) e.phone = "Phone is required";
      else if (!phoneOk) e.phone = "Enter 10-digit phone number";

      if (!form.confirmPassword) e.confirmPassword = "Confirm password is required";
      else if (form.confirmPassword !== form.password)
        e.confirmPassword = "Passwords do not match";
    }

    return e;
  }, [form, isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setMsg({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }

    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      // ✅ Replace this with your API call later (fetch/axios)
      await new Promise((r) => setTimeout(r, 800));

      if (isLogin) {
        setMsg({ type: "success", text: "Login successful (demo)." });
      } else {
        setMsg({ type: "success", text: "Account created successfully (demo)." });
      }

      // optional: clear form after success
      // setForm({ fullName:"", email:"", phone:"", password:"", confirmPassword:"" });
    } catch (err) {
      setMsg({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center p-0 m-0">
      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 rounded-0 overflow-hidden shadow-none border-0">
        {/* Left - Branding */}
        <div className="p-8 md:p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center font-bold text-xl">
              U
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">Uptoskills</h1>
              <p className="text-white/80 text-sm">Modern Authentication</p>
            </div>
          </div>

          <div className="mt-10 space-y-4 text-white/90">
            <p className="text-lg font-semibold">
              {isLogin ? "Welcome back 👋" : "Join Uptoskills ✨"}
            </p>
            <p className="text-sm leading-relaxed text-white/80">
              Sign in to your account to access all courses, resources and exclusive content. Create an account to start learning with Uptoskills.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/15 p-4">
                <p className="text-xs text-white/70">Security</p>
                <p className="font-semibold">Secure</p>
              </div>
              <div className="rounded-xl bg-white/15 p-4">
                <p className="text-xs text-white/70">Platform</p>
                <p className="font-semibold">Modern</p>
              </div>
              <div className="rounded-xl bg-white/15 p-4">
                <p className="text-xs text-white/70">Validation</p>
                <p className="font-semibold">Real-time</p>
              </div>
              <div className="rounded-xl bg-white/15 p-4">
                <p className="text-xs text-white/70">Support</p>
                <p className="font-semibold">24/7</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-xs text-white/70">
            Made with love for <span className="font-semibold text-white">learners worldwide 🌍</span>
          </div>
        </div>

        {/* Right - Form */}
        <div className="p-8 md:p-10 bg-slate-900">
          {/* Toggle */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{isLogin ? "Login" : "Register"}</h2>

            <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  isLogin ? "bg-white text-slate-900" : "text-white/80 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  !isLogin ? "bg-white text-slate-900" : "text-white/80 hover:text-white"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Alert */}
          {msg.text ? (
            <div
              className={`mt-5 rounded-xl px-4 py-3 text-sm border ${
                msg.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-200"
              }`}
            >
              {msg.text}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Full name */}
            {!isLogin && (
              <Field
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                placeholder="Enter your full name"
                error={errors.fullName}
              />
            )}

            {/* Email */}
            <Field
              label="Email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              error={errors.email}
              type="email"
            />

            {/* Phone */}
            {!isLogin && (
              <Field
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="10-digit mobile number"
                error={errors.phone}
              />
            )}

            {/* Password */}
            <div>
              <label className="text-sm text-white/80">Password</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 outline-none transition
                    ${errors.password ? "border-rose-500/70" : "border-white/10 focus:border-indigo-400/60"}`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:text-white transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1 text-xs text-rose-300">{errors.password}</p>
              ) : null}
            </div>

            {/* Confirm password */}
            {!isLogin && (
              <Field
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChange}
                placeholder="Re-enter password"
                error={errors.confirmPassword}
                type="password"
              />
            )}

            {/* Remember + Forgot */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm text-white/70">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="accent-indigo-400" />
                  Remember me
                </label>
                <button type="button" className="text-indigo-300 hover:text-indigo-200">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed transition px-4 py-3 font-semibold"
              type="submit"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-white/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(isLogin ? "register" : "login")}
                className="text-indigo-300 hover:text-indigo-200 font-semibold"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </form>

          {/* Small note */}
          <p className="mt-6 text-xs text-white/50">
            Note: This is demo UI. Connect backend using fetch/axios on submit.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="text-sm text-white/80">{label}</label>
      <input
        {...props}
        className={`mt-1 w-full rounded-xl bg-white/5 border px-4 py-3 outline-none transition
          ${error ? "border-rose-500/70" : "border-white/10 focus:border-indigo-400/60"}`}
      />
      {error ? <p className="mt-1 text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}
