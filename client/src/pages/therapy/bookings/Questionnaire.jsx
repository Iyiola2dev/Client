import React, { useEffect, useState } from 'react'

const Questionnaire = ({ onComplete }) => {
  const [formValues, setFormValues] = useState({
    accountName: "",
    phone: "",
    email: "",
    brings: "",
    emotion: "",
    achive: "",
    sought: "",
    else: "",
  });

  // Check if the form is complete
  useEffect(() => {
    const isComplete = Object.values(formValues).every((value) => value !== "");
    onComplete(isComplete);
  }, [formValues, onComplete]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <div className="py-8">
      <div>
        <p className="font-bold text-xl text-center">Therapy Questionnaire</p>
      </div>

      <div className="flex flex-col items-center justify-center pt-8 px-4">
        <form className="flex flex-col gap-6 items-center justify-center lg:block lg:w-[60vw]">
          <div className="space-y-2 w-full">
            <label className="font-semibold" htmlFor="accountName">
              Account Name
            </label>
            <input
              id="accountName"
              type="text"
              placeholder="Name used in creating the account"
              value={formValues.accountName}
              onChange={handleChange}
              className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <label className="font-semibold" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex gap-2">
              <input
                id="phone"
                type="tel"
                placeholder="+234 1234567890"
                value={formValues.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
                pattern="^\+\d{1,4}\s\d{7,12}$"
                required
              />
            </div>
            <small className="text-xs text-gray-500">
              Format: +CountryCode PhoneNumber (e.g., +234 1234567890)
            </small>
          </div>

          <div className="space-y-2 w-full">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email used in creating account"
              className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <label className="font-semibold" htmlFor="email">
              What brings you to therapy?
            </label>
            <input
              id="email"
              type="text"
              value={formValues.brings}
              onChange={handleChange}
              placeholder="Therapy...."
              className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <label className="font-semibold" htmlFor="email">
              How would you describe your current emotional state?
            </label>
            <input
              id="email"
              type="text"
              value={formValues.emotion}
              onChange={handleChange}
              placeholder="I am...."
              className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <label className="font-semibold" htmlFor="email">
              What goals do you hope to achieve through therapy?
            </label>
            <input
              id="email"
              type="text"
              value={formValues.achieve}
              onChange={handleChange}
              placeholder="I hope to...."
              className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <label className="font-semibold" htmlFor="email">
              Have you sought therapy orr counseling before?
            </label>
            <input
              id="email"
              type="text"
              value={formValues.sought}
              onChange={handleChange}
              placeholder="Yes I have/No I haven't...."
              className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <label className="font-semibold" htmlFor="email">
              Is there anything else you'd like your therapist to know about your current situation?
            </label>
            <input
              id="email"
              type="text"
              value={formValues.else}
              onChange={handleChange}
              placeholder="Yes there is/No there isn't...."
              className="w-full p-2 border-2 border-slate-700 rounded-xl text-sm"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Questionnaire