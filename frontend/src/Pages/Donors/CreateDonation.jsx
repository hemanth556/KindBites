
import { useState } from "react";
import { Upload, X, ImagePlus, CalendarDays } from "lucide-react";

function CreateDonation() {
  const [formData, setFormData] = useState({
    foodName: "",
    foodType: "Meal",
    quantity: "",
    pickupBefore: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(formData.quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    console.log({
      ...formData,
      image,
    });

    alert("Donation form submitted! Backend integration is pending.");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-800";

  return (
    <div className="mx-auto max-w-5xl">

      {/* Page Heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">
          Add Food Donation
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          List your surplus food for NGOs and volunteers.
        </p>
      </div>

      {/* Donation Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

        <form onSubmit={handleSubmit}>

          {/* Food Name & Food Type */}
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <label className={labelClass}>
                Food Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleChange}
                placeholder="e.g. Veg Biryani"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Food Type <span className="text-red-500">*</span>
              </label>

              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="Meal">Meal</option>
                <option value="Rice">Rice</option>
                <option value="Snacks">Snacks</option>
                <option value="Bakery">Bakery</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Beverages">Beverages</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          {/* Quantity & Pickup Time */}
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <label className={labelClass}>
                Quantity (Servings) <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. 100"
                min="1"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Pickup Before <span className="text-red-500">*</span>
              </label>

              <div className="relative min-w-0">
                <input
                  type="datetime-local"
                  name="pickupBefore"
                  value={formData.pickupBefore}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)}
                  required
                  className={`${inputClass} pr-10`}
                />

                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="mb-6">
            <label className={labelClass}>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the food, ingredients or any special instructions..."
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Image Upload */}
          <div className="mb-7">
            <label className={labelClass}>
              Upload Image
            </label>

            <div className="flex flex-wrap items-start gap-4">

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative h-28 w-32 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Food preview"
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-1 top-1 rounded-full bg-white p-1 text-red-500 shadow"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Upload Box */}
              <label className="flex h-28 w-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-green-500 hover:bg-green-50">

                {imagePreview ? (
                  <ImagePlus size={22} className="text-green-600" />
                ) : (
                  <Upload size={22} className="text-gray-500" />
                )}

                <span className="mt-2 text-xs font-semibold text-gray-600">
                  {image ? "Change Image" : "Upload Image"}
                </span>

                <span className="mt-1 text-[10px] text-gray-400">
                  Max 5 MB
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

            </div>

            <p className="mt-2 text-xs text-gray-400">
              Upload a clear image of the food you're donating.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">

            <button
              type="reset"
              onClick={() => {
                removeImage();
                setFormData({
                  foodName: "",
                  foodType: "Meal",
                  quantity: "",
                  pickupBefore: "",
                  description: "",
                });
              }}
              className="w-full rounded-lg border border-gray-300 px-6 py-2.5 sm:w-auto text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Reset
            </button>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-7 py-2.5 sm:w-auto text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              Submit Donation
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateDonation;
