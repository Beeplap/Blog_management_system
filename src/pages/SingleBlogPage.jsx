import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SingleBlogPage = () => {
  const [singleBlog, setSingleBlog] = useState();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://blog-hqx2.onrender.com/blog/single/${id}`
      );
      setSingleBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-full sm:max-w-2xl lg:max-w-3xl transition-all duration-300">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-600 mb-4 sm:mb-6 text-center">
          Blog Details
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
          {singleBlog?.title || "Loading..."}
        </h2>

        {/* Image */}
        <div className="relative mb-4 sm:mb-6">
          <img
            src={singleBlog?.image || "/default-image.jpg"}
            alt={singleBlog?.title || " LOADING ......."}
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg border border-gray-200"
            onError={(e) => (e.target.src = "/default-image.jpg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          <p>
            By{" "}
            <span className="font-medium">{singleBlog?.author?.name || "Unknown"}</span>
          </p>
          <p>
            Published:{" "}
            {singleBlog?.createdAt
              ? new Date(singleBlog.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Content */}
        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
          {singleBlog?.content || "Loading content..."}
        </p>

        {/* Back Button */}
        <div className="flex justify-center">
          <Link
            to="/dashboard"
            className="bg-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-sm sm:text-base"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;