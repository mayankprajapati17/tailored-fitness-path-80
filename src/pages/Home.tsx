
import { Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
                  Organize Your Job Hunt{" "}
                  <span className="text-primary">Effortlessly</span>
                </h1>
                <p className="mt-6 text-xl text-gray-600">
                  Keep track of all your job applications in one place and never miss an opportunity again.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/jobs">
                  <Button size="lg" className="gap-2">
                    Track Your Jobs <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-xs font-medium">JD</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                    <span className="text-xs font-medium">TK</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
                    <span className="text-xs font-medium">RS</span>
                  </div>
                </div>
                <span>Join hundreds of students already using our platform</span>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Image credit: https://unsplash.com/photos/person-using-laptop-n95VMLxqM2I */}
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop"
                  alt="Student tracking job applications" 
                  className="rounded-lg shadow-xl z-10 relative object-cover max-h-[600px]" 
                />
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-primary rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 border-t border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Applications</h3>
              <p className="text-gray-600">Keep all your job applications organized in one place with detailed status tracking.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Update Status</h3>
              <p className="text-gray-600">Easily update the status of your applications as you progress through the hiring process.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Insights</h3>
              <p className="text-gray-600">Gain valuable insights into your job search progress and success rates.</p>
            </div>
          </div>
        </div>
        
        <footer className="py-8 border-t border-gray-100 text-center text-gray-500">
          <p>Built with ❤️ for students</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
