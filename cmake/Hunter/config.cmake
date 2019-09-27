hunter_config(SPIRV-Headers
    VERSION 1.5.1
    URL https://github.com/KhronosGroup/SPIRV-Headers/archive/1.5.1.tar.gz
    SHA1 77018bfe6cb1eceaf824e401dbd206660a25bf66
)

hunter_config(SPIRV-Tools
    VERSION v2019.4-p0
    URL https://github.com/mchiasson/SPIRV-Tools/archive/v2019.4-p0.tar.gz
    SHA1 fde8521fd5c99166de934d7d7d65800940dfba93
)

hunter_config(glslang
    VERSION v7.12.3352-p0
    URL https://github.com/mchiasson/glslang/archive/v7.12.3352-p0.tar.gz
    SHA1 8589282141eb8edb37d38930a8d6420910b6a0cf
    CMAKE_ARGS ENABLE_HLSL=ON
)
