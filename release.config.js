module.exports = {
  "branches": [
    "master"
  ],
  "tagFormat": ["v${version}"],
  "plugins": [
    ["@semantic-release/commit-analyzer", {
      "preset": "angular",
      "parserOpts": {
        "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
      }
    }],
    ["@semantic-release/release-notes-generator", {
      "preset": "angular",
    }],
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md"
    }],
    "@semantic-release/github",
    [
      "@google/semantic-release-replace-plugin",
      {
        "replacements": [
          {
            "files": ["pubspec.yaml"],
            "from": "version: .*",
            "to": "version: ${nextRelease.version}",
            "results": [
              {
                "file": "pubspec.yaml",
                "hasChanged": true,
                "numMatches": 1,
                "numReplacements": 1
              }
            ],
            "countMatches": true
          },
          {
            "files": ["lib/constants.dart"],
            "from": "static const packageVersion = '.*';",
            "to": "static const packageVersion = '${nextRelease.version}';",
            "results": [
              {
                "file": "lib/constants.dart",
                "hasChanged": true,
                "numMatches": 1,
                "numReplacements": 1
              }
            ],
            "countMatches": true
          },
        ]
      }
    ],
    ["@semantic-release/git", {
      "assets": ["pubspec.yaml", "CHANGELOG.md", "lib/constants.dart"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
  ],
}
