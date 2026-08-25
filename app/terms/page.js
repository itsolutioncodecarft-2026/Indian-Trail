export const metadata = {
  title: 'Terms & Conditions — Indian Routes & Trails',
  description: 'Terms and Conditions for Indian Routes & Trails.',
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="container-narrow">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="section-title mb-6" style={{ color: '#1a2332' }}>Terms &amp; Conditions</h1>
        <div className="divider-gold mb-10" />

        <div className="space-y-6 font-sans" style={{ color: '#4A5568' }}>
          <div className="p-5" style={{ backgroundColor: '#EBF4FF', border: '1px solid #BEE3F8', borderRadius: '4px' }}>
            <p className="text-sm italic" style={{ color: '#2C5282' }}>
              <strong>Note:</strong> This page is a placeholder pending legal review. Pricing, cancellation policy, visa requirements and insurance details must be completed before publishing.
            </p>
          </div>

          <p className="text-sm leading-relaxed">
            By using this website and engaging the services of <strong style={{ color: '#1a2332' }}>Indian Routes &amp; Trails</strong>, you agree to the following terms.
          </p>

          <h2 className="font-serif text-xl font-light" style={{ color: '#1a2332' }}>Services</h2>
          <p className="text-sm leading-relaxed">Indian Routes &amp; Trails is a luxury travel consultancy offering curated, personalised journeys across India.</p>

          <h2 className="font-serif text-xl font-light" style={{ color: '#1a2332' }}>Pricing</h2>
          <p className="text-sm leading-relaxed">Pricing is bespoke and personalised for each journey. All pricing is provided upon request following an initial consultation.</p>

          <h2 className="font-serif text-xl font-light" style={{ color: '#1a2332' }}>Cancellation Policy</h2>
          <p className="text-sm leading-relaxed italic" style={{ color: '#A0AEC0' }}>
            [To be completed — please add cancellation terms before publishing.]
          </p>

          <h2 className="font-serif text-xl font-light" style={{ color: '#1a2332' }}>Responsible Tourism</h2>
          <p className="text-sm leading-relaxed">
            We are committed to ethical and responsible tourism. We do not encourage elephant rides or any animal-based activities.
          </p>

          <h2 className="font-serif text-xl font-light" style={{ color: '#1a2332' }}>Contact</h2>
          <p className="text-sm leading-relaxed">
            <strong style={{ color: '#1a2332' }}>indianroutesandtrails@gmail.com</strong><br />
            Sri Sri Villa, Near Rajasthan ITI College, NH-8 Kunda, Amber, Jaipur – 302028
          </p>
        </div>
      </div>
    </section>
  );
}
