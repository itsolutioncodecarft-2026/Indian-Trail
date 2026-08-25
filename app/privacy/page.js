export const metadata = {
  title: 'Privacy Policy — Indian Routes & Trails',
  description: 'Privacy Policy for Indian Routes & Trails.',
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="container-narrow">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="section-title mb-6" style={{ color: '#1a2332' }}>Privacy Policy</h1>
        <div className="divider-gold mb-10" />

        <div className="space-y-6 font-sans" style={{ color: '#4A5568' }}>
          <div className="p-5" style={{ backgroundColor: '#EBF4FF', border: '1px solid #BEE3F8', borderRadius: '4px' }}>
            <p className="text-sm italic" style={{ color: '#2C5282' }}>
              <strong>Note:</strong> This Privacy Policy is a placeholder pending legal review. Contact information is sourced from official business documents.
            </p>
          </div>

          <p className="text-sm leading-relaxed">
            <strong style={{ color: '#1a2332' }}>Indian Routes &amp; Trails</strong> is committed to protecting the privacy of our clients and website visitors.
          </p>

          <h2 className="font-serif text-xl font-light" style={{ color: '#1a2332' }}>Information We Collect</h2>
          <p className="text-sm leading-relaxed">
            We collect information you provide when submitting an enquiry, including your name, email address, phone number, travel preferences and any other details you choose to share.
          </p>

          <h2 className="font-serif text-xl font-light" style={{ color: '#1a2332' }}>How We Use Your Information</h2>
          <p className="text-sm leading-relaxed">
            Your information is used solely to respond to your travel enquiry and to personalise your journey with Indian Routes &amp; Trails. We do not sell or share your personal information with third parties.
          </p>

          <h2 className="font-serif text-xl font-light" style={{ color: '#1a2332' }}>Contact</h2>
          <p className="text-sm leading-relaxed">
            For any privacy-related questions:<br />
            <strong style={{ color: '#1a2332' }}>indianroutesandtrails@gmail.com</strong><br />
            Sri Sri Villa, Near Rajasthan ITI College, NH-8 Kunda, Amber, Jaipur – 302028
          </p>
        </div>
      </div>
    </section>
  );
}
