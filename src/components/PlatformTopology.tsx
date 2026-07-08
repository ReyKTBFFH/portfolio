export default function PlatformTopology() {
  return (
    <svg
      viewBox="0 0 560 158"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-xl opacity-70"
      aria-hidden="true"
    >
      <defs>
        <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#326CE5" />
        </marker>
        <marker id="arrowDeploy" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#9CA3AF" />
        </marker>
      </defs>

      {/* Lane labels */}
      <text x="0" y="12" fill="#6B7280" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em">
        SERVE
      </text>
      <text x="0" y="92" fill="#6B7280" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em">
        DEPLOY
      </text>

      {/* ── Serve path ── */}
      <rect x="0" y="22" width="52" height="36" rx="5" stroke="#1F2937" strokeWidth="1.5" fill="#121821" />
      <text x="26" y="38" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="JetBrains Mono, monospace">
        Visitor
      </text>
      <text x="26" y="50" textAnchor="middle" fill="#6B7280" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
        HTTPS
      </text>

      <path d="M52 40 H62" stroke="#326CE5" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />

      <rect x="62" y="22" width="72" height="36" rx="5" stroke="#1F2937" strokeWidth="1.5" fill="#121821" />
      <text x="98" y="38" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="JetBrains Mono, monospace">
        Route53
      </text>
      <text x="98" y="50" textAnchor="middle" fill="#6B7280" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
        DNS
      </text>

      <path d="M134 40 H148" stroke="#326CE5" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />

      <rect x="148" y="22" width="96" height="36" rx="5" stroke="#326CE5" strokeWidth="1.5" fill="#121821" />
      <text x="196" y="38" textAnchor="middle" fill="#E6EDF3" fontSize="8" fontFamily="JetBrains Mono, monospace">
        CloudFront
      </text>
      <text x="196" y="50" textAnchor="middle" fill="#6B7280" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
        CDN + ACM TLS
      </text>

      <path d="M244 40 H258" stroke="#326CE5" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
      <text x="251" y="34" textAnchor="middle" fill="#6B7280" fontSize="6" fontFamily="JetBrains Mono, monospace">
        OAC
      </text>

      <rect x="258" y="22" width="76" height="36" rx="5" stroke="#1F2937" strokeWidth="1.5" fill="#121821" />
      <text x="296" y="38" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="JetBrains Mono, monospace">
        S3
      </text>
      <text x="296" y="50" textAnchor="middle" fill="#6B7280" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
        private origin
      </text>

      {/* ── Deploy path ── */}
      <rect x="0" y="102" width="58" height="28" rx="4" stroke="#1F2937" strokeWidth="1" fill="#0A0E14" />
      <text x="29" y="119" textAnchor="middle" fill="#6B7280" fontSize="7" fontFamily="JetBrains Mono, monospace">
        git push
      </text>

      <path d="M58 116 H72" stroke="#9CA3AF" strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#arrowDeploy)" />

      <rect x="72" y="100" width="118" height="32" rx="5" stroke="#1F2937" strokeWidth="1.5" fill="#121821" />
      <text x="131" y="114" textAnchor="middle" fill="#9CA3AF" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
        GitHub Actions
      </text>
      <text x="131" y="125" textAnchor="middle" fill="#6B7280" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
        OIDC → IAM role
      </text>

      {/* GHA → S3 sync */}
      <path
        d="M190 108 C230 88, 260 72, 296 58"
        stroke="#9CA3AF"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        markerEnd="url(#arrowDeploy)"
        fill="none"
      />
      <text x="248" y="72" fill="#9CA3AF" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
        s3 sync
      </text>

      {/* GHA → CloudFront invalidation */}
      <path
        d="M170 100 C175 78, 185 62, 196 58"
        stroke="#9CA3AF"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        markerEnd="url(#arrowDeploy)"
        fill="none"
      />
      <text x="168" y="68" fill="#9CA3AF" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
        invalidate
      </text>

      {/* ── External projects (not part of this site's infra) ── */}
      <rect
        x="380"
        y="18"
        width="168"
        height="62"
        rx="6"
        stroke="#38BDF8"
        strokeWidth="1"
        fill="#121821"
        strokeDasharray="5 4"
      />
      <text x="464" y="34" textAnchor="middle" fill="#38BDF8" fontSize="7" fontFamily="JetBrains Mono, monospace">
        EXTERNAL PROJECTS
      </text>
      <text x="464" y="48" textAnchor="middle" fill="#6B7280" fontSize="7" fontFamily="JetBrains Mono, monospace">
        separate K8s / cloud infra
      </text>
      <text x="464" y="60" textAnchor="middle" fill="#6B7280" fontSize="7" fontFamily="JetBrains Mono, monospace">
        1Aarambh · Vaacha
      </text>
      <text x="464" y="72" textAnchor="middle" fill="#6B7280" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
        not hosted on this S3
      </text>
    </svg>
  );
}
