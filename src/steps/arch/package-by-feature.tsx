import type { TreeNodeData } from "@/components/TreeNode";
import type { ArchCardData } from "@/components/ArchCard";
import { Architecture } from "@/types/enum/Architecture.enum";

const treeData: TreeNodeData[] = [
  {
    id: "src",
    name: "src",
    children: [
      {
        id: "features",
        name: "features",
        children: [
          {
            id: "auth",
            name: "auth",
            children: [
              {
                id: "auth-components",
                name: "components",
                children: [
                  { id: "auth-atoms", name: "atoms" },
                  { id: "auth-molecules", name: "molecules" },
                  { id: "auth-organisms", name: "organisms" },
                ],
              },
              { id: "auth-hooks", name: "hooks" },
              { id: "auth-services", name: "services" },
              { id: "auth-types", name: "types" },
              { id: "auth-index", name: "index.ts" },
            ],
          },
          {
            id: "dashboard",
            name: "dashboard",
            children: [
              {
                id: "dash-components",
                name: "components",
                children: [
                  { id: "dash-atoms", name: "atoms" },
                  { id: "dash-molecules", name: "molecules" },
                  { id: "dash-organisms", name: "organisms" },
                  { id: "dash-templates", name: "templates" },
                ],
              },
              { id: "dash-hooks", name: "hooks" },
              { id: "dash-services", name: "services" },
              { id: "dash-index", name: "index.ts" },
            ],
          },
        ],
      },
      {
        id: "shared",
        name: "shared",
        children: [
          { id: "shared-components", name: "components" },
          { id: "shared-hooks", name: "hooks" },
          { id: "shared-utils", name: "utils" },
        ],
      },
      { id: "app", name: "App.tsx" },
      { id: "main", name: "main.tsx" },
    ],
  },
];

function Diagram() {
  const box = (
    x: number, y: number, w: number, h: number,
    label: string, opts?: { emphasis?: boolean; size?: number }
  ) => {
    const { emphasis = false, size = 10 } = opts ?? {};
    return (
      <g>
        <rect
          x={x} y={y} width={w} height={h} rx={6}
          fill="currentColor" fillOpacity={emphasis ? 0.12 : 0.06}
          stroke="currentColor" strokeOpacity={emphasis ? 0.3 : 0.18}
        />
        <text
          x={x + w / 2} y={y + h / 2 + size * 0.35}
          textAnchor="middle" fill="currentColor"
          fontSize={size} fontFamily="var(--font-sans)"
          fontWeight={emphasis ? 600 : 400}
        >
          {label}
        </text>
      </g>
    );
  };

  const conn = (
    x1: number, y1: number, x2: number, y2: number,
    dashed = false
  ) => (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="currentColor"
      strokeOpacity={dashed ? 0.12 : 0.18}
      strokeDasharray={dashed ? "5 3" : undefined}
      markerEnd={dashed ? "url(#arr-d)" : "url(#arr)"}
    />
  );

  return (
    <svg viewBox="0 0 340 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" viewBox="0 0 8 6" refX="8" refY="3" markerWidth="7" markerHeight="5" orient="auto">
          <path d="M0 0 L8 3 L0 6z" fill="currentColor" opacity="0.35" />
        </marker>
        <marker id="arr-d" viewBox="0 0 8 6" refX="8" refY="3" markerWidth="7" markerHeight="5" orient="auto">
          <path d="M0 0 L8 3 L0 6z" fill="currentColor" opacity="0.2" />
        </marker>
      </defs>

      {box(130, 10, 80, 28, "src/", { emphasis: true, size: 11 })}

      {conn(150, 38, 95, 58)}
      {conn(190, 38, 250, 58)}

      {box(30, 58, 130, 28, "features/", { emphasis: true, size: 11 })}
      {box(205, 58, 105, 28, "shared/", { size: 11 })}

      {conn(65, 86, 55, 110)}
      {conn(125, 86, 145, 110)}

      {box(10, 110, 90, 26, "auth/", { size: 10 })}
      {box(110, 110, 100, 26, "dashboard/", { size: 10 })}

      {conn(55, 136, 55, 156)}

      <rect
        x={6} y={155} width={100} height={165} rx={8}
        fill="currentColor" fillOpacity={0.03}
        stroke="currentColor" strokeOpacity={0.1}
        strokeDasharray="4 2"
      />
      <text
        x={56} y={170} textAnchor="middle"
        fill="currentColor" fontSize={7} fontFamily="var(--font-sans)"
        opacity={0.4} letterSpacing="1.5"
      >
        ATOMIC DESIGN
      </text>

      {box(18, 178, 76, 22, "atoms", { size: 9 })}
      {conn(56, 200, 56, 210)}
      {box(18, 212, 76, 22, "molecules", { size: 9 })}
      {conn(56, 234, 56, 244)}
      {box(18, 246, 76, 22, "organisms", { size: 9 })}
      {conn(56, 268, 56, 278)}
      {box(18, 280, 76, 22, "templates", { size: 9 })}

      {conn(160, 136, 160, 156)}

      {box(118, 158, 86, 22, "components/", { size: 9 })}
      {conn(160, 180, 160, 190)}
      {box(118, 192, 86, 22, "hooks/", { size: 9 })}
      {conn(160, 214, 160, 224)}
      {box(118, 226, 86, 22, "services/", { size: 9 })}
      {conn(160, 248, 160, 258)}
      {box(118, 260, 86, 22, "types/", { size: 9 })}

      {conn(257, 86, 257, 106)}

      {box(215, 108, 86, 22, "components/", { size: 9 })}
      {conn(257, 130, 257, 140)}
      {box(215, 142, 86, 22, "hooks/", { size: 9 })}
      {conn(257, 164, 257, 174)}
      {box(215, 176, 86, 22, "utils/", { size: 9 })}

      {conn(100, 123, 213, 119, true)}
      {conn(204, 237, 213, 187, true)}

      <g opacity={0.4}>
        <line x1={20} y1={380} x2={48} y2={380} stroke="currentColor" strokeOpacity={0.5} markerEnd="url(#arr)" />
        <text x={55} y={383} fill="currentColor" fontSize={8} fontFamily="var(--font-sans)">contains</text>

        <line x1={130} y1={380} x2={158} y2={380} stroke="currentColor" strokeOpacity={0.3} strokeDasharray="5 3" markerEnd="url(#arr-d)" />
        <text x={165} y={383} fill="currentColor" fontSize={8} fontFamily="var(--font-sans)">imports from</text>
      </g>
    </svg>
  );
}

export const packageByFeature: ArchCardData = {
  id: Architecture.PACKAGE_BY_FEATURE,
  title: "Package by Feature + Atomic Design",
  description:
    "Package by Feature organizes code by domain and functionality rather than by technical type. Instead of having global folders like components, hooks, and services, each feature lives in its own isolated module containing everything it needs to work. Combined with Atomic Design, each feature has its own component hierarchy: atoms (basic elements like buttons and inputs), molecules (simple combinations of atoms), organisms (complex blocks like forms and tables), and templates (page layouts). Everything reused across features goes into a global shared folder. The main rule is: if a component or piece of logic only makes sense inside a feature, it stays there. This ensures high cohesion, low coupling, and makes it easier to scale the project without changes in one area affecting others.",
  treeData,
  diagram: <Diagram />,
};

const fsdTreeData: TreeNodeData[] = [
  {
    id: "src",
    name: "src",
    children: [
      {
        id: "app",
        name: "app",
        children: [
          { id: "app-providers", name: "providers" },
          { id: "app-styles", name: "styles" },
          { id: "app-app", name: "App.tsx" },
          { id: "app-main", name: "main.tsx" },
        ],
      },
      {
        id: "pages",
        name: "pages",
        children: [
          {
            id: "auth-page",
            name: "auth",
            children: [
              { id: "auth-page-ui", name: "ui" },
              { id: "auth-page-index", name: "index.tsx" },
            ],
          },
          {
            id: "dashboard-page",
            name: "dashboard",
            children: [
              { id: "dash-page-ui", name: "ui" },
              { id: "dash-page-index", name: "index.tsx" },
            ],
          },
        ],
      },
      {
        id: "widgets",
        name: "widgets",
        children: [
          {
            id: "sidebar-widget",
            name: "sidebar",
            children: [
              { id: "sidebar-ui", name: "ui" },
              { id: "sidebar-index", name: "index.ts" },
            ],
          },
          {
            id: "header-widget",
            name: "header",
            children: [
              { id: "header-ui", name: "ui" },
              { id: "header-index", name: "index.ts" },
            ],
          },
        ],
      },
      {
        id: "features",
        name: "features",
        children: [
          {
            id: "auth-feature",
            name: "auth",
            children: [
              { id: "auth-f-ui", name: "ui" },
              { id: "auth-f-model", name: "model" },
              { id: "auth-f-api", name: "api" },
              { id: "auth-f-config", name: "config" },
              { id: "auth-f-index", name: "index.ts" },
            ],
          },
          {
            id: "users-feature",
            name: "users",
            children: [
              { id: "users-f-ui", name: "ui" },
              { id: "users-f-model", name: "model" },
              { id: "users-f-api", name: "api" },
              { id: "users-f-index", name: "index.ts" },
            ],
          },
        ],
      },
      {
        id: "entities",
        name: "entities",
        children: [
          {
            id: "user-entity",
            name: "user",
            children: [
              { id: "user-ui", name: "ui" },
              { id: "user-model", name: "model" },
              { id: "user-api", name: "api" },
              { id: "user-lib", name: "lib" },
              { id: "user-index", name: "index.ts" },
            ],
          },
          {
            id: "session-entity",
            name: "session",
            children: [
              { id: "session-model", name: "model" },
              { id: "session-api", name: "api" },
              { id: "session-index", name: "index.ts" },
            ],
          },
        ],
      },
      {
        id: "shared",
        name: "shared",
        children: [
          { id: "shared-ui", name: "ui" },
          { id: "shared-lib", name: "lib" },
          { id: "shared-config", name: "config" },
          { id: "shared-types", name: "types" },
        ],
      },
    ],
  },
];

function FSDDiagram() {
  const layer = (
    x: number, y: number, w: number, h: number,
    label: string, opts?: { emphasis?: boolean; size?: number }
  ) => {
    const { emphasis = false, size = 9 } = opts ?? {};
    return (
      <g>
        <rect
          x={x} y={y} width={w} height={h} rx={6}
          fill="currentColor" fillOpacity={emphasis ? 0.15 : 0.06}
          stroke="currentColor" strokeOpacity={emphasis ? 0.35 : 0.18}
        />
        <text
          x={x + w / 2} y={y + h / 2 + size * 0.35}
          textAnchor="middle" fill="currentColor"
          fontSize={size} fontFamily="var(--font-sans)"
          fontWeight={emphasis ? 600 : 400}
        >
          {label}
        </text>
      </g>
    );
  };

  const arrow = (x1: number, y1: number, x2: number, y2: number) => (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="currentColor" strokeOpacity={0.25}
      markerEnd="url(#arr-fsd)"
    />
  );

  return (
    <svg viewBox="0 0 340 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-fsd" viewBox="0 0 8 6" refX="8" refY="3" markerWidth="7" markerHeight="5" orient="auto">
          <path d="M0 0 L8 3 L0 6z" fill="currentColor" opacity="0.35" />
        </marker>
      </defs>

      <text
        x={170} y={18} textAnchor="middle" fill="currentColor"
        fontSize={10} fontFamily="var(--font-sans)" fontWeight={600}
        opacity={0.6}
      >
        FSD — Import Direction (top → bottom only)
      </text>

      {layer(50, 35, 240, 32, "app", { emphasis: true })}
      {arrow(170, 67, 170, 80)}

      {layer(50, 80, 240, 32, "pages", { emphasis: true })}
      {arrow(170, 112, 170, 125)}

      {layer(50, 125, 240, 32, "widgets", { emphasis: true })}
      {arrow(170, 157, 170, 170)}

      {layer(50, 170, 240, 32, "features", { emphasis: true })}
      {arrow(170, 202, 170, 215)}

      {layer(50, 215, 240, 32, "entities", { emphasis: true })}
      {arrow(170, 247, 170, 260)}

      {layer(50, 260, 240, 32, "shared")}

      <rect
        x={10} y={305} width={320} height={80} rx={8}
        fill="currentColor" fillOpacity={0.03}
        stroke="currentColor" strokeOpacity={0.1}
        strokeDasharray="4 2"
      />

      <text
        x={170} y={325} textAnchor="middle" fill="currentColor"
        fontSize={8} fontFamily="var(--font-sans)" opacity={0.5}
      >
        Rules:
      </text>
      <text
        x={170} y={340} textAnchor="middle" fill="currentColor"
        fontSize={8} fontFamily="var(--font-sans)" opacity={0.5}
      >
        A slice can only import from lower layers
      </text>
      <text
        x={170} y={355} textAnchor="middle" fill="currentColor"
        fontSize={8} fontFamily="var(--font-sans)" opacity={0.5}
      >
        Segments: ui / model / api / lib / config
      </text>
      <text
        x={170} y={370} textAnchor="middle" fill="currentColor"
        fontSize={8} fontFamily="var(--font-sans)" opacity={0.5}
      >
        public API via index.ts
      </text>

      <line x1={30} y1={385} x2={58} y2={385} stroke="currentColor" strokeOpacity={0.5} markerEnd="url(#arr-fsd)" />
      <text x={65} y={388} fill="currentColor" fontSize={8} fontFamily="var(--font-sans)">imports from</text>
    </svg>
  );
}

export const featureSlicedDesign: ArchCardData = {
  id: Architecture.FEATURE_SLICED_DESIGN,
  title: "Feature-Sliced Design (FSD)",
  description:
    "Feature-Sliced Design is a modern architectural methodology that organizes frontend code into strict layers with unidirectional dependency flow. The six layers are: app (app initialization and providers), pages (complete pages and routing), widgets (complex composite blocks like sidebar and header), features (user-interactive functionalities), entities (business entities like user, session, product), and shared (reusable utilities and UI primitives). The golden rule is that each layer can only import from layers below it — pages can import from widgets, features, entities, and shared, but never from app. Within each slice, code is organized by segments: ui, model, api, lib, and config, with all public exports going through index.ts. This architecture prevents circular dependencies, enforces clear boundaries, and makes it trivial to onboard new developers or extract features into separate packages.",
  treeData: fsdTreeData,
  diagram: <FSDDiagram />,
};

const cleanArchTreeData: TreeNodeData[] = [
  {
    id: "src",
    name: "src",
    children: [
      {
        id: "domain",
        name: "domain",
        children: [
          {
            id: "domain-user",
            name: "user",
            children: [
              { id: "user-entity", name: "User.ts" },
              { id: "user-value-object", name: "Email.ts" },
              { id: "user-errors", name: "errors.ts" },
            ],
          },
          {
            id: "domain-auth",
            name: "auth",
            children: [
              { id: "auth-entity", name: "AuthToken.ts" },
              { id: "auth-repo-interface", name: "IAuthRepository.ts" },
              { id: "auth-usecase-interface", name: "IAuthUseCase.ts" },
            ],
          },
        ],
      },
      {
        id: "application",
        name: "application",
        children: [
          {
            id: "app-auth",
            name: "auth",
            children: [
              { id: "app-login", name: "LoginUseCase.ts" },
              { id: "app-logout", name: "LogoutUseCase.ts" },
              { id: "app-refresh", name: "RefreshTokenUseCase.ts" },
            ],
          },
          {
            id: "app-user",
            name: "user",
            children: [
              { id: "app-create-user", name: "CreateUserUseCase.ts" },
              { id: "app-get-user", name: "GetUserUseCase.ts" },
            ],
          },
        ],
      },
      {
        id: "adapters",
        name: "adapters",
        children: [
          {
            id: "api-adapter",
            name: "api",
            children: [
              { id: "api-http", name: "HttpClient.ts" },
              { id: "api-axios", name: "AxiosAdapter.ts" },
              { id: "api-interceptors", name: "interceptors.ts" },
            ],
          },
          {
            id: "storage-adapter",
            name: "storage",
            children: [
              { id: "storage-repo", name: "StorageRepository.ts" },
              { id: "storage-local", name: "LocalStorageAdapter.ts" },
            ],
          },
        ],
      },
      {
        id: "infrastructure",
        name: "infrastructure",
        children: [
          { id: "infra-axios", name: "axios-instance.ts" },
          { id: "infra-config", name: "config.ts" },
          { id: "infra-env", name: "env.ts" },
        ],
      },
      {
        id: "presentation",
        name: "presentation",
        children: [
          {
            id: "pres-ui",
            name: "ui",
            children: [
              { id: "pres-atoms", name: "atoms" },
              { id: "pres-molecules", name: "molecules" },
              { id: "pres-pages", name: "pages" },
            ],
          },
          {
            id: "pres-hooks",
            name: "hooks",
            children: [
              { id: "pres-use-auth", name: "useAuth.ts" },
              { id: "pres-use-user", name: "useUser.ts" },
            ],
          },
          { id: "pres-app", name: "App.tsx" },
          { id: "pres-main", name: "main.tsx" },
        ],
      },
    ],
  },
];

function CleanArchDiagram() {
  const ring = (
    cx: number, cy: number, r: number,
    label: string, opts?: { emphasis?: boolean; size?: number }
  ) => {
    const { emphasis = false, size = 8 } = opts ?? {};
    return (
      <g>
        <circle
          cx={cx} cy={cy} r={r}
          fill="currentColor" fillOpacity={emphasis ? 0.12 : 0.04}
          stroke="currentColor" strokeOpacity={emphasis ? 0.35 : 0.15}
          strokeWidth={1.5}
        />
        <text
          x={cx} y={cy - r + 12}
          textAnchor="middle" fill="currentColor"
          fontSize={size} fontFamily="var(--font-sans)"
          fontWeight={emphasis ? 600 : 400}
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 340 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-ca" viewBox="0 0 8 6" refX="8" refY="3" markerWidth="7" markerHeight="5" orient="auto">
          <path d="M0 0 L8 3 L0 6z" fill="currentColor" opacity="0.35" />
        </marker>
      </defs>

      <text
        x={170} y={18} textAnchor="middle" fill="currentColor"
        fontSize={10} fontFamily="var(--font-sans)" fontWeight={600}
        opacity={0.6}
      >
        Clean Architecture — Dependency Rule
      </text>

      {ring(170, 200, 155, "presentation")}
      {ring(170, 200, 120, "infrastructure")}
      {ring(170, 200, 88, "adapters")}
      {ring(170, 200, 60, "application")}
      {ring(170, 200, 35, "domain", { emphasis: true, size: 9 })}

      <line x1={170} y1={45} x2={170} y2={165} stroke="currentColor" strokeOpacity={0.2} markerEnd="url(#arr-ca)" />
      <text x={180} y={105} fill="currentColor" fontSize={7} fontFamily="var(--font-sans)" opacity={0.4}>
        depends on
      </text>

      <rect
        x={10} y={310} width={320} height={75} rx={8}
        fill="currentColor" fillOpacity={0.03}
        stroke="currentColor" strokeOpacity={0.1}
        strokeDasharray="4 2"
      />

      <text
        x={170} y={330} textAnchor="middle" fill="currentColor"
        fontSize={8} fontFamily="var(--font-sans)" opacity={0.5}
      >
        Rules:
      </text>
      <text
        x={170} y={345} textAnchor="middle" fill="currentColor"
        fontSize={8} fontFamily="var(--font-sans)" opacity={0.5}
      >
        Dependencies point inward — outer layers depend on inner
      </text>
      <text
        x={170} y={360} textAnchor="middle" fill="currentColor"
        fontSize={8} fontFamily="var(--font-sans)" opacity={0.5}
      >
        Domain has zero dependencies on outer layers
      </text>
      <text
        x={170} y={375} textAnchor="middle" fill="currentColor"
        fontSize={8} fontFamily="var(--font-sans)" opacity={0.5}
      >
        Use cases are framework-agnostic
      </text>
    </svg>
  );
}

export const cleanArchitecture: ArchCardData = {
  id: Architecture.CLEAN_ARCHITECTURE,
  title: "Clean Architecture (Ports & Adapters)",
  description:
    "Clean Architecture adapts Uncle Bob's principles for frontend applications, organizing code into concentric layers where dependencies always point inward. The core domain layer contains business entities, value objects, and interface contracts — it has zero external dependencies. The application layer holds use cases (interactors) that orchestrate business rules, depending only on domain interfaces. The adapters layer implements those interfaces with concrete technology (Axios HTTP client, LocalStorage, etc.). The infrastructure layer provides framework-level setup and configuration. Finally, the presentation layer contains the UI components, hooks, and pages that consume use cases. The key benefit is testability: domain and application layers can be unit-tested without any UI or network mocking. It also makes framework migrations trivial since business logic is completely decoupled from React, Vue, or any other library.",
  treeData: cleanArchTreeData,
  diagram: <CleanArchDiagram />,
};
