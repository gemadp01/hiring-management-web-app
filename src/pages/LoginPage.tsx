import { Button } from "@/components/common/Button";
import AuthPageLayout from "@/components/common/layout/AuthPageLayout";
import { supabase } from "@/supabase-client";
import { useForm, type FieldValues } from "react-hook-form";
import { Link } from "react-router";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleLogin = async (data: FieldValues) => {
    // console.log(data);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.log("Error signing up: ", error);
      return;
    }
  };

  return (
    <AuthPageLayout
      headTitle="Masuk ke Rakamin"
      headDesc="Belum punya akun?"
      headLink="Daftar menggunakan email"
      footButton={
        <Button variant="neutral" size="lg" width="full" className="gap-2.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </g>
          </svg>
          Masuk dengan Google
        </Button>
      }
    >
      <form onSubmit={handleSubmit(handleLogin)} className="w-full">
        <div className="mb-4">
          <label className="block mb-2 text-s-regular text-neutral-90">
            Email
            <span className="text-danger-main">*</span>
          </label>

          <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
            <input
              type="text"
              {...register("email")}
              placeholder="xxx@gmail.com"
              className="w-full py-2 px-4
                      bg-transparent focus:outline-none placeholder-neutral-60"
            />
          </div>

          {/* Helper Message and Counter */}
          {/* {errors.title && (
                    <div
                      className={`flex items-center justify-between mt-2 text-s-regular ${
                        errors.title ? "text-danger-main" : "text-neutral-70"
                      }`}
                    >
                      <span className="flex items-center">
                        {errors.title.message}
                      </span>
                    </div>
                  )} */}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-s-regular text-neutral-90">
            Password
            <span className="text-danger-main">*</span>
          </label>

          <div className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10">
            <input
              type="password"
              {...register("password")}
              placeholder="xxx"
              className="w-full py-2 px-4
                      bg-transparent focus:outline-none placeholder-neutral-60"
            />
          </div>

          {/* Helper Message and Counter */}
          {/* {errors.title && (
                    <div
                      className={`flex items-center justify-between mt-2 text-s-regular ${
                        errors.title ? "text-danger-main" : "text-neutral-70"
                      }`}
                    >
                      <span className="flex items-center">
                        {errors.title.message}
                      </span>
                    </div>
                  )} */}
        </div>
        <div className="mb-4 text-right">
          <Link to="/forgot-password" className="text-primary-main">
            Lupa kata sandi?
          </Link>
        </div>
        <div>
          <Button
            variant="secondary"
            size="lg"
            width="full"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            Masuk
          </Button>
        </div>
      </form>
    </AuthPageLayout>
  );
};

export default LoginPage;
