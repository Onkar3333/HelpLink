import { Link } from 'react-router-dom';
import { HandHeart, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <HandHeart className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">HELPLINK</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting people who need help with people who want to help. Building a stronger community together.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/browse" className="hover:text-foreground transition-colors">
                  Browse Requests
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-foreground transition-colors">
                  Post a Request
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-foreground transition-colors">
                  Sign Up as Helper
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Help Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Blood Donation</li>
              <li>Medical Assistance</li>
              <li>Emergency Help</li>
              <li>Food & Grocery</li>
              <li>Education Support</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">More Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Financial Help</li>
              <li>Shelter & Housing</li>
              <li>Job & Skills</li>
              <li>Senior Citizen Help</li>
              <li>Disaster Relief</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HELPLINK. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-critical fill-critical" /> for humanity
          </p>
        </div>
      </div>
    </footer>
  );
}